import { useState, useEffect, useContext } from "react";
import ChatApp from "./components/ChatApp.jsx";
import { WebSocketContextProvider } from "./contexts/WebSocketContextProvider";
import {
  useMessagingSocket,
  useSocketWithHandler,
} from "./components/WebSocketHandler";
import consts from "./Constants";
import "./App.css";
import ProfileWrapper from "./components/ProfileWrapper.jsx";
import useClick from "./utils/useClick.js";

const useSessionEnd = () => {
  const [sessionEnd, setSessionEnd] = useState(false);

  useEffect(() => {
    if (sessionEnd) {
      document.querySelector("body").innerHTML = "<div> Session Ended </div>";
      document.querySelector("head").innerHTML = "";
    }
  }, [sessionEnd]);

  return [sessionEnd, setSessionEnd];
};

const EndSession = (sessionEnd, socket) => {
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [sessionEnd, socket]);
};

const App = () => {
  const [sessionEnd, setSessionEnd] = useSessionEnd();
  const [socket, setSocket] = useSocketWithHandler(
    `ws://${consts.IP}:${consts.PORT}`,
    setSessionEnd,
  );
  EndSession(sessionEnd, socket);
  const [messagesSocket, setMessagesSocket] = useMessagingSocket(
    `ws://${consts.IP}:${consts.MESSAGES_PORT}`,
  );

  const [clicked, setClicked] = useClick();
  console.log(clicked);
  if (sessionEnd) {
    return <div>Session Ended</div>;
  }
  return (
    <WebSocketContextProvider
      value={{
        socket,
        setSocket,
        messagesSocket,
        setMessagesSocket,
        setSessionEnd,
      }}
    >
      {clicked ? <ChatApp /> : <ProfileWrapper setClicked={setClicked} />}
    </WebSocketContextProvider>
  );
};

export default App;
