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
import useGetProfiles from "./utils/manageProfiles.js";

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

const LoadProfiles = ({ signalSocket, sessionEnd }) => {
  const [profiles, setProfiles] = useGetProfiles(signalSocket);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [clicked, setClicked] = useClick(profiles, setSelectedProfile);
  // console.log(clicked);
  if (sessionEnd) {
    return <div>Session Ended</div>;
  }
  return (
    <>
      {clicked ? (
        <ChatApp />
      ) : (
        <ProfileWrapper
          profiles={profiles}
          setProfiles={setProfiles}
          setClicked={setClicked}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
        />
      )}
    </>
  );
};

const reloadTime = () => {
  const prev = Number(localStorage.getItem("time"));
  return prev - Date.now();
};

const App = () => {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("time", Date.now());
    return true;
  });
  const [sessionEnd, setSessionEnd] = useSessionEnd();
  const [socket, setSocket] = useSocketWithHandler(
    `ws://${consts.IP}:${consts.PORT}`,
    setSessionEnd,
  );
  EndSession(sessionEnd, socket);
  const [signalsSocket, setSignalsSocket] = useSocketWithHandler(
    `ws://${consts.IP}:${consts.MESSAGES_PORT}`,
    setSessionEnd,
  );

  return (
    <WebSocketContextProvider
      value={{
        socket,
        setSocket,
        signalsSocket,
        setSignalsSocket,
        setSessionEnd,
      }}
    >
      <LoadProfiles signalSocket={signalsSocket} sessionEnd={sessionEnd} />
    </WebSocketContextProvider>
  );
};

export default App;
