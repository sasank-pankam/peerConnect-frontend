import { useState, useEffect } from "react";
import consts from "../Constants";
import { useContentSender } from "./ContentSenderObject";
import { useWebSocket } from "../contexts/WebSocketContextProvider";

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

const useGetProfiles = (socket) => {
  const [profiles, setProfiles] = useState([]);
  const { senders } = useWebSocket();
  const messageFunc = (event) => {
    const data = JSON.parse(event.data);
    if (data.header !== consts.CHANGED_PEER_LIST) return;

    const profilesArray = data.content;
    setProfiles([data.msgId, profilesArray]);
  };
  useEffect(() => {
    // console.log("sodi: ", senders.signalSender);
    if (!senders.signalSender) {
      setProfiles([
        null,
        {
          ["ali.ini"]: {
            USER: { name: "ali" },
            SERVER: {
              ip: "172.168.0.1",
              port: 2020,
            },
          },
          ["sasank.ini"]: {
            USER: { name: "sasank" },
            SERVER: {
              ip: "172.168.0.1",
              port: 2020,
            },
          },
          ["admin.ini"]: {
            USER: { name: "admin" },
            SERVER: {
              ip: "172.168.0.1",
              port: 2020,
            },
          },
        },
      ]);
    } else {
      socket.addEventListener("message", messageFunc);
      senders.signalSender(consts.SENDPROFILES, null, null, null);
    }
  }, [socket, senders]);

  return [profiles, setProfiles];
};

export default useGetProfiles;

// not using
export const getChangedProfiles = (profiles) => {
  return {
    ["header"]: consts.CHANGED_PEER_LIST,
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

export const sendProfiles = (profiles, selectedProfile, senders, id) => {
  // profiles
  senders.signalSender(consts.HANDLE_UPDATED_PEERS, profiles, null, id);
  senders.signalSender(
    consts.HANDLE_SET_PROFILE,
    profiles[selectedProfile],
    null,
    null,
  );
};
