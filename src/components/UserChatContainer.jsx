import { useContext, useRef, useEffect, useState } from "react";
import { Message } from "../utils/Message";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { useSelector } from "react-redux";
import ItemWrapper from "./ItemWrapper";
import ScrollToBottom from "./ScrollToBottom";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { dataSender } from "../utils/Sender";
import consts from "../Constants";

const blockedStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "red",
  alignItems: "center",
  // height: "100%",
  width: "100%",
};

// eslint-disable-next-line react/prop-types
const UserChatContainer = ({ id }) => {
  const { currentPositions, setCurrentPositions, blockedYou, youBlocked } =
    useUser();
  const { sender } = useWebSocket();

  const messageList = useSelector((state) => state.Users[id]) || [];

  const divRef = useRef(null);
  const scrollRef = useRef(0);
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    // if (messageList.length === 0) {
    //   fetchMessages();
    // }

    if (divRef.current) {
      divRef.current.scrollTop = currentPositions.get(id) || 0;
    }
    return () => {
      setCurrentPositions((prev) => {
        const newPositions = new Map(prev);
        newPositions.set(id, scrollRef.current);
        return newPositions;
      });
    };
  }, []);

  let timeOutVar;
  const handleMessagesScroll = (event) => {
    scrollRef.current = event.target.scrollTop;
    if (event.target.scrollTop === 0) {
      if (timeOutVar) clearTimeout(timeOutVar);
      timeOutVar = setTimeout(() => {
        fetchMessages(id, messageList.length);
      }, 1000);
    }
  };

  // TODO: change after creating messages socket
  const messagesSocket = null;
  const fetchMessages = () => {
    sender(new Message(consts.LOAD_MESSAGES, messageList.length, id));
  };

  return (
    <div
      key={id}
      style={{ overflowY: "scroll", width: "100%", height: "100%" }}
    >
      <div
        className="chats-container"
        style={{ display: "flex" }}
        id={`child-chats-container-${id}`}
        ref={divRef}
        onScroll={handleMessagesScroll}
      >
        {messageList.map((message, index) => (
          <ItemWrapper key={index} id={id} message={message} />
        ))}
        {blockedYou.has(id) && (
          <div style={blockedStyle}>
            <h1>You are blocked by this user</h1>
          </div>
        )}
        {youBlocked.has(id) && (
          <div style={blockedStyle}>
            <h1>You blocked this user</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChatContainer;
