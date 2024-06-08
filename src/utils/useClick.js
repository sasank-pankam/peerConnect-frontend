import { useState, useEffect, useContext } from "react";
import { sendProfiles } from "./manageProfiles";
import { UsersContext } from "../contexts/UsersContextProvider";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { getUser, setUser } from "./storeAndRetriveProfile";

const profileExist = (profiles, check) => {
  let userFound = false;
  const stringCheck = JSON.stringify(check);
  for (const profile of profiles) {
    if (JSON.stringify(profile) === stringCheck) {
      userFound = true;
      break;
    }
  }
  return userFound;
};

const useClick = (profiles) => {
  const [found, setFound] = useState(false);
  const { setOwner } = useContext(UsersContext);
  const { socket } = useWebSocket();
  const wrapperSetFound = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    setUser(profiles[selectedProfile - 1]);
    sendProfiles(socket, profiles);
    localStorage.setItem("alreadySelected", "true");
    setFound(true);
  };
  useEffect(() => {
    const hasFound = localStorage.getItem("alreadySelected");
    setFound((_) => {
      if (hasFound === "true") {
        const user = getUser();
        if (profileExist(profiles, user)) {
          setOwner(user);
          return true;
        }
      }
      return false;
    });
  }, [profiles]);
  return [found, wrapperSetFound];
};

export default useClick;
