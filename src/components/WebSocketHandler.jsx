/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Constants from "../Constants";
import { contentSenderObject } from "../utils/ContentSenderObject";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { appendMF, loadMessages, acceptedFile } from "../app/MessagesSlice";
import { UsersContext } from "../contexts/UsersContextProvider";
import { getMessage } from "./MessageBox";
import { getFile } from "./FileBox";
import { useDispatch } from "react-redux";

export const useSocketWithHandler = (url, setSessionEnd) => {
  console.log("URL : ", url);

  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { users, setOwner, setBlockedYou, addUser, removeUser } =
    useContext(UsersContext);

  const sessionEnded = () => {
    console.log("Session ended");
    setSessionEnd(true);
  };

  const blockedByUser = (id) => {
    setBlockedYou((prev) => {
      const newBlockedYou = new Set(prev);
      newBlockedYou.add(id);
      return newBlockedYou;
    });
  };

  const unBlockedByUser = (id) => {
    setBlockedYou((prev) => {
      const newBlockedYou = new Set(prev);
      newBlockedYou.delete(id);
      return newBlockedYou;
    });
  };

  const validateMessage = (message) => {
    const id = message[Constants.ID];
    const text = message[Constants.CONTENT];
    const header = message[Constants.HEADER];

    switch (header) {
      case Constants.NEW_MESSAGE:
        dispatch(
          appendMF({ newMessage: getMessage(text, { isSender: false }), id }),
        );
        break;
      case Constants.FILE_RECEIVED:
        dispatch(
          appendMF({ newMessage: getFile({ ...text, isSender: false }), id }),
        );
        break;
      case Constants.ACCEPTED_FILE:
        dispatch(acceptedFile({ id, fileId: text }));
        break;
      case Constants.FILE_SENT:
        dispatch(
          appendMF({ newMessage: getFile({ ...text, isSender: true }), id }),
        );
        break;
      case Constants.NewUser:
        addUser(text, id);
        break;
      case Constants.UserLeft:
        removeUser(id);
        break;
      case Constants.END:
        sessionEnded();
        break;
      case Constants.CHANGE_USER_NAME:
        setOwner(text);
        break;
      case Constants.BLOCKED:
        blockedByUser();
        break;
      case Constants.UNBLOCKED:
        unBlockedByUser();
        break;
      default:
        console.log("Invalid message");
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");
      setTimeout(() => {
        if (users.length > 0) return;
        new contentSenderObject(
          newSocket,
          Constants.SYNC_USERS,
          Constants.SYNC_USERS,
          Constants.SYNC_USERS,
        ).sendContent();
      }, 1000);
    });

    newSocket.addEventListener("message", (event) => {
      const receivedMessage = event.data;
      const message = JSON.parse(receivedMessage);
      validateMessage(message);
    });

    setSocket(newSocket);

    return () => {
      console.log("Unmounting...");
      console.log("Cleaning up main WebSocket connection...");
      newSocket.removeEventListener("open", () => {});
      newSocket.removeEventListener("message", () => {});
      newSocket.close();
      console.log("Closed WebSocket connection");
    };
  }, []);

  return [socket, setSocket];
};

export const useMessagingSocket = (url) => {
  const [messageSocket, setMessageSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const validateMessageList = (message) => {
      dispatch(loadMessages(message));
    };
    const newMessagesSocket = new WebSocket(url);

    newMessagesSocket.addEventListener("open", (event) => {
      console.log("Messages WebSocket connection opened");
    });

    newMessagesSocket.addEventListener("message", (event) => {
      const receivedMessage = event.data;

      const message = JSON.parse(receivedMessage);
      // validateMessageList(message);
    });

    setMessageSocket(newMessagesSocket);

    return () => {
      console.log("Unmounting...");
      console.log("Cleaning up messages WebSocket connection...");
      newMessagesSocket.removeEventListener("open", () => {});
      newMessagesSocket.removeEventListener("message", () => {});
      newMessagesSocket.close();
      console.log("Closed messages WebSocket connection");
    };
  }, []);

  return [messageSocket, setMessageSocket];
};
