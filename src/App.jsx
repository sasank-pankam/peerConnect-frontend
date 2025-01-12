import { useState, useEffect, useContext } from "react";
import { useSetRecvRegistery } from "./utils/SetRecvRegistery.js";
import ChatApp from "./components/ChatApp.jsx";
import { useSocketWithHandshake } from "./components/WebSocketHandler.jsx";
import {
  useWebSocket,
  WebSocketProvider,
} from "./contexts/WebSocketContextProvider.jsx";
import consts from "./Constants";
import "./App.css";
import ProfileWrapper from "./components/ProfileWrapper.jsx";
import useGetProfiles, { sendProfiles } from "./utils/manageProfiles.js";
import { dataSender } from "./utils/Sender.js";
import { UsersProvider, useUser } from "./contexts/UsersContextProvider.jsx";
import { useSocket } from "./utils/useSockets.js";
import { Message } from "./utils/Message.js";
import {
  OwnershipProvider,
  useOwner,
} from "./contexts/OwnershipCContextProvider.jsx";
import { InteractionProvider } from "./contexts/InteractionContextProvider.jsx";
import { ActiveUserProvider } from "./contexts/ActitveUserContextProvider.jsx";
import { MetaDataProvider } from "./contexts/MetadataContextProvider.jsx";
import { UiStateProvider } from "./contexts/UiStateContextProvider.jsx";

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
 * @returns {JSX.Element}
 */
const LoadProfiles = () => {
  const [profiles, setProfiles] = useGetProfiles();
  const [msgId, profilesArray] = profiles;

  const { sender } = useWebSocket();

  /**
   * @type {import("./contexts/UsersContextProvider.jsx").UserContextValue}
   */
  const { setOwner } = useOwner();

  const [clicked, setClicked] = useState(false);

  const onClick = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    console.log("sending profiles", profiles);
    sendProfiles(profiles, selectedProfile, sender, msgId);
    setClicked(true);
  };
  // if (sessionEnd) {
  //   return <div>Session Ended</div>;
  // }
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
  // const [sessionEnd, setSessionEnd] = useSessionEnd();

  // if (sessionEnd) return <div>sessionEnded</div>;
  return (
    <WebSocketProvider>
      <UsersProvider>
        <OwnershipProvider>
          <InteractionProvider>
            <ActiveUserProvider>
              <MetaDataProvider>
                <UiStateProvider>
                  <LoadProfiles />
                </UiStateProvider>
              </MetaDataProvider>
            </ActiveUserProvider>
          </InteractionProvider>
        </OwnershipProvider>
      </UsersProvider>
    </WebSocketProvider>
  );
};

export default App;
