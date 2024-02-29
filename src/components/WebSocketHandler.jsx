import { useContext, useEffect } from "react";
import Constants from "../Constants";
import { contentSenderObject } from "../utils/ContentSenderObject";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { appendMF, loadMessages } from "../app/MessagesSlice";
import { UsersContext } from "../contexts/UsersContextProvider";
import { getMessage } from "./MessageBox";
import { getFile } from "./FileBox";
import { useSelector, useDispatch } from "react-redux";

const sessionEnded = () => {
  console.log("Session ended");
};

function WebSocketHandler() {
  const dispach = useDispatch();

  const {
    users,
    setUsers,
    currentActiveUser,
    setOwner,
    renderebleUsers,
    setRenderebleUsers,
      // blockedYou,
      setBlockedYou,
  } = useContext(UsersContext);
  const { socket, setSocket, messagesSocket, setMessagesSocket } =
    useWebSocket();
  // const messageLists = useSelector((state) => state.Users) || [];

  const blockedByUser = (id) => {
    setBlockedYou(prev => {
      const newBlockedYou = new Set(prev);
        newBlockedYou.add(id);
        return newBlockedYou;
    });
  };

  const unBlockedByUser = (id) => {
    setBlockedYou(prev => {
      const newBlockedYou = new Set(prev);
        newBlockedYou.delete(id);
        return newBlockedYou;
    });
  }
  const validateMessage = (message) => {
    // const { id, CONTENT: text, HEADER } = message;
    const id = message[Constants.ID];
    const text = message[Constants.CONTENT];
    const header = message[Constants.HEADER];

    switch (header) {
      case Constants.InCommingMessage:
        dispach(
          appendMF({ newMessage: getMessage(text, { isSender: false }), id }),
        );
        break;
      case Constants.InCommingFile:
        dispach(
          appendMF({ newMessage: getFile({ ...text, isSender: false }), id }),
        );
        break;
      case Constants.SentFile:
        dispach(
          appendMF({ newMessage: getFile({ ...text, isSender: true }), id }),
        );
        break;
      case Constants.NewUser:
        addUser(text, id);
        break;
      case Constants.UserLeft:
        removeUser(id);
        break;
      case Constants.ClossingMessage:
        sessionEnded();
        break;
      case Constants.ChangeUserName:
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

  const validateMessageList = (message) => {
    dispach(loadMessages(message));
  };
  useEffect(() => {
    const newSocket = new WebSocket(`ws://${Constants.IP}:${Constants.PORT}`);

    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");

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

  useEffect(() => {
    const newMessagesSocket = new WebSocket(
      `ws://${Constants.IP}:${Constants.MESSAGES_PORT}`,
    );

    newMessagesSocket.addEventListener("open", (event) => {
      console.log("Messages WebSocket connection opened");
    });

    newMessagesSocket.addEventListener("message", (event) => {
      const receivedMessage = event.data;
      const message = JSON.parse(receivedMessage);
      validateMessageList(message);
    });

    setMessagesSocket(newMessagesSocket);

    return () => {
      console.log("Unmounting...");
      console.log("Cleaning up messages WebSocket connection...");
      newMessagesSocket.removeEventListener("open", () => {});
      newMessagesSocket.removeEventListener("message", () => {});
      newMessagesSocket.close();
      console.log("Closed messages WebSocket connection");
    };
  }, []);
  const addUser = (userName, id) => {
    const newUsers = [...users];
    const newRenderebles = [...renderebleUsers];
    if (newUsers.findIndex((user) => user.id === id) !== -1) {
      // console.log("User already exists");
      return;
    }
    const newUser = { userName: userName, id: id };
    newUsers.push(newUser);
    newRenderebles.push(id);
    setUsers(newUsers);
    setRenderebleUsers(newRenderebles);
  };

  const removeUser = (id) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user.id === id);
    if (index == -1) {
      // console.log("User does not exists");
      return;
    }
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  // code for append message
  // code for append file

  // useEffect(() => {
  //   if (currentActiveUser === null) return;

  //   const data = {
  //     header: Constants.ActiveUser,
  //     id: currentActiveUser,
  //     content: "",
  //   };
  //   const senderObject = new contentSenderObject(socket, data);
  //   senderObject.sendContent();
  // }, [currentActiveUser]);

  return <></>;
}

export default WebSocketHandler;
