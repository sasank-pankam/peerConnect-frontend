import { useState, useEffect, useContext } from "react";
import { sendProfiles } from "./manageProfiles";
import { UsersContext } from "../contexts/UsersContextProvider";
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

const useClick = (profiles, setSelectedProfile) => {
  const [found, setFound] = useState(false);
  const { setOwner } = useContext(UsersContext);
  const { signalsSocket: socket } = useWebSocket();
  // console.log(
  //   "----------------------------> messages socket : ",
  //   useWebSocket(),
  // );
  const wrapperSetFound = ({ selectedProfile, profiles }) => {
    setOwner(profiles[selectedProfile]);
    setUser(selectedProfile);
    sendProfiles(socket, profiles, selectedProfile);
    localStorage.setItem("alreadySelected", "true");
    setFound(true);
  };
  useEffect(() => {
    const hasFound = localStorage.getItem("alreadySelected");

    if (hasFound === "true") {
      const user = getUser();
      if (profileExist(profiles, user)) {
        setSelectedProfile(user);
      }
    }
  }, [profiles]);
  return [found, wrapperSetFound];
};

export default useClick;
