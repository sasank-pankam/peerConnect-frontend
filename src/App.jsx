import { useState, useEffect, useContext } from "react";
import ChatApp from "./components/ChatApp.jsx";
import { WebSocketContextProvider } from "./contexts/WebSocketContextProvider";
import { useSocketWithHandler } from "./components/WebSocketHandler";
import consts from "./Constants";
import "./App.css";
import ProfileWrapper from "./components/ProfileWrapper.jsx";
import useClick from "./utils/useClick.js";
import useGetProfiles from "./utils/manageProfiles.js";
import { useContentSender } from "./utils/ContentSenderObject.js";

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
 * @param {WebSocket} signalsSocket
 * @param {Boolean} sessionEnd
 * @returns {JSX.Element}
 */
const LoadProfiles = ({ signalsSocket, sessionEnd }) => {
  const [profiles, setProfiles] = useGetProfiles(signalsSocket);
  const [msgId, profilesArray] = profiles;

  const [clicked, setClicked] = useState(false);
  const wrapperSetFound = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    sendProfiles(profiles, selectedProfile, senders, msgId);
    setFound(true);
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
          setClicked={wrapperSetFound}
        />
      )}
    </>
  );
};

const meaageValidator = (message) => { };
const signalsValidator = (message) => { };

/**
 * app component
 * @returns {JSX.Element}
 */
const App = () => {
  const [sessionEnd, setSessionEnd] = useSessionEnd();

  const [messagesSocket, setMessagesSocket] = useSocketWithHandler(
    `ws://${consts.IP}:${consts.MESSAGES_PORT}`,
    meaageValidator,
    (websocket) => {
      console.log("connected. messages");
      websocket.send(
        JSON.stringify({
          header: 0x00,
          content: null,
          id: null,
        }),
      );
    },
  );
  const [signalsSocket, setSignalsSocket] = useSocketWithHandler(
    `ws://${consts.IP}:${consts.SIGNALS_PORT}`,
    signalsValidator,
    (websocket) => {
      console.log("connected. signals.");

      websocket.send(
        JSON.stringify({
          header: 0x01,
          content: null,
          id: null,
        }),
      );
    },
  );

  const messageSender = useContentSender(messagesSocket, { name: "MESSAGES" });
  const signalSender = useContentSender(signalsSocket, { name: "SIGNALS" });

  const [senders, setSenders] = useState({
    messageSender,
    signalSender,
  });

  useEffect(() => {
    setSenders({
      messageSender,
      signalSender,
    });
  }, [signalsSocket, messagesSocket]);

  EndSession(sessionEnd, signalsSocket);

  if (sessionEnd) return <div>sessionEnded</div>;
  return (
    <WebSocketContextProvider
      value={{
        messagesSocket,
        // setMessagesSocket,
        signalsSocket,
        // setSignalsSocket,
        setSessionEnd,

        senders,
      }}
    >
      {signalsSocket && (
        <LoadProfiles
          senders={senders}
          signalsSocket={signalsSocket}
          sessionEnd={sessionEnd}
        />
      )}
    </WebSocketContextProvider>
  );
};

export default App;
