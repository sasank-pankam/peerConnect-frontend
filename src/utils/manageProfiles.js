import { useState, useEffect } from "react";
import consts from "../Constants";
import { dataSender } from "./Sender";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { Message } from "./Message";

/*
  profile = {
    {
      header: 'this is a profiles list', 
      content: {…}, 
      id: null
    }
    content: {
      Ali: {CONFIGURATIONS: {…}},
      admin: {CONFIGURATIONS: {…}}
      ali1: {CONFIGURATIONS: {…}}
      new: {CONFIGURATIONS: {…}}
    }  
    CONFIGURATIONS: {
      server_ip: '24.24.0.100', 
      username: 'Ali', 
      server_port: '45000'
    } 
  }

old method
Array.from(socket);
*/

const useGetProfiles = () => {
  const [profiles, setProfiles] = useState([
    10,
    {
      saka: {
        USER: { name: "saka" },
        SERVER: {
          ip: "1.1.1.1",
          port: "2020",
        },
      },
    },
    ["wlan0", "lo", "enp0", "test"],
  ]);
  const { sender, registerHandler, unRegisterHandler } = useWebSocket();
  const extractAndSetProfiles = (message) => {
    const profilesArray = message.content;
    setProfiles([message.msgId, profilesArray]);
    unRegisterHandler(consts.CHANGED_PROFILE_LIST);
  };

  useEffect(() => {
    registerHandler(consts.CHANGED_PROFILE_LIST, extractAndSetProfiles);
    sender(new Message(consts.SENDPROFILES, null, null, null));
  }, []);

  return [profiles, setProfiles];
};

export default useGetProfiles;

// not using
export const getChangedProfiles = (profiles) => {
  return {
    ["header"]: consts.CHANGED_PROFILE_LIST,
    ["content"]: Object.fromEntries(
      profiles.map((profile) => {
        return [
          profile.owner,
          {
            CONFIGURATIONS: {
              ["server_ip"]: profile.confs.ip,
              ["server_port"]: profile.confs.port,
              ["username"]: profile.changed,
            },
          },
        ];
      }),
    ),
    ["id"]: null,
  };
};

/**
 * @param {Object} profiles
 * @param {string} selectedProfiles
 * @param {Function} sender
 * @param {string} id
 */
export const sendProfiles = (profiles, selectedProfile, sender, id) => {
  // profiles
  sender(new Message(consts.HANDLE_UPDATED_PEERS, profiles, null, id));
  sender(
    new Message(
      consts.HANDLE_SET_PROFILE,
      profiles[selectedProfile],
      null,
      null,
    ),
  );
};
