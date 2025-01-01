import { useState, useEffect, useContext } from "react";
import { sendProfiles } from "./manageProfiles";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { getUser, setUser } from "./storeAndRetriveProfile";

const profileExist = (profiles, check) => {
  // let userFound = false;
  // const stringCheck = JSON.stringify(check);
  // for (const profile of profiles) {
  //   if (JSON.stringify(profile) === stringCheck) {
  //     userFound = true;
  //     break;
  //   }
  // }
  // return userFound;
  return check in profiles;
};

const useClick = (profiles, msgId, setSelectedProfile) => {
  const [found, setFound] = useState(false);
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { setOwner } = useUser();
  const { signalsSocket: socket, senders } = useWebSocket();
  useEffect(() => {
    const hasFound = localStorage.getItem("alreadySelected");

    if (hasFound === "true") {
      const { selectedProfile } = getUser();
      if (profileExist(profiles, selectedProfile)) {
        setSelectedProfile(selectedProfile);
      }
    }
  }, [profiles]);
  return [found, wrapperSetFound];
};

export default useClick;
