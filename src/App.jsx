import { useState, useEffect, useContext } from "react";
import ChatApp from "./components/ChatApp.jsx";
import { useSocketWithHandshake } from "./components/WebSocketHandler.jsx";
import {
  useWebSocket,
  WebSocketContextProvider,
} from "./contexts/WebSocketContextProvider";
import consts from "./Constants";
import "./App.css";
import ProfileWrapper from "./components/ProfileWrapper.jsx";
import useGetProfiles, { sendProfiles } from "./utils/manageProfiles.js";
import { dataSender } from "./utils/Sender.js";
import { useUser } from "./contexts/UsersContextProvider.jsx";
import { useSocket } from "./utils/useSockets.js";

const useSessionEnd = () => {
  const [sessionEnd, setSessionEnd] = useState(false);

  return [sessionEnd, setSessionEnd];
};

const EndSession = (sessionEnd, socket) => {
  if (!sessionEnd) return;

  const exit = confirm("you want to exit");
  if (exit) {
    // do stuff related to exit smoothly
  }
};

/**
 * @param {{ signalsSocket:WebSocket, sessionEnd: Boolean}} input
 * @returns {JSX.Element}
 */
const LoadProfiles = ({ sessionEnd }) => {
  const [profiles, setProfiles] = useGetProfiles();
  const [msgId, profilesArray] = profiles;

  /**
   * @type {import("./contexts/WebSocketContextProvider.js").websocketContextValue}
   */
  const { sender } = useWebSocket();

  /**
   * @type {import("./contexts/UsersContextProvider.jsx").UserContextValue}
   */
  const { setOwner } = useUser();

  const [clicked, setClicked] = useState(false);

  const onClick = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    profiles[selectedProfile].USER.selected = "true";
    sendProfiles(profiles, selectedProfile, sender, msgId);
    setClicked(true);
  };
  if (sessionEnd) {
    return <div>Session Ended</div>;
  }
  return (
    <>
      {clicked ? (
        <ChatApp />
      ) : (
        <ProfileWrapper
          profiles={profilesArray}
          setProfiles={setProfiles}
          clicked={onClick}
        />
      )}
    </>
  );
};

const LoadingAnim = () => {
  return <div>loading...</div>;
};

const App = () => {
  const [sessionEnd, setSessionEnd] = useSessionEnd();

  const {
    signalsSocket,
    messagesSocket,
    registerHandler,
    sender,
    unRegisterHandler,
  } = useSocket();

  EndSession(sessionEnd, signalsSocket);

  if (!(signalsSocket && messagesSocket)) return <LoadingAnim />;
  if (sessionEnd) return <div>sessionEnded</div>;
  return (
    <WebSocketContextProvider
      value={{
        sender,
        registerHandler,
        unRegisterHandler,
      }}
    >
      {signalsSocket && <LoadProfiles sessionEnd={sessionEnd} />}
    </WebSocketContextProvider>
  );
};

export default App;
