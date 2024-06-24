import { useState, useEffect } from "react";
import { contentSenderObject } from "./ContentSenderObject";

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
Array.from(Object.values(profiles), (value) => ({
      owner: value.USER.name,
      changed: value.USER.name,
      confs: {
        ip: value.SERVER.ip,
        port: value.SERVER.ip,
      },
    }));
*/

const useGetProfiles = (socket) => {
  // console.log("Socket in getProfiles: ", socket);

  const [profiles, setProfiles] = useState([]);
  const messageFunc = (event) => {
    const data = JSON.parse(event.data);
    // console.log("at messageFunc : ", data);
    if (data.header !== "this is a profiles list") return;

    const profilesArray = data.content;
    // console.log("profiles :\n", data);
    setProfiles(profilesArray);
  };
  useEffect(() => {
    if (!socket) {
      setProfiles({
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
      });
    } else {
      socket.addEventListener("message", messageFunc);
    }

    return () => {
      if (socket) socket.removeEventListener("message", messageFunc);
    };
  }, [socket]);

  return [profiles, setProfiles];
};

export default useGetProfiles;

// not using
export const getChangedProfiles = (profiles) => {
  return {
    ["header"]: "this is a profiles list",
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

export const sendProfiles = (socket, profiles, selectedProfile) => {
  // profiles
  new contentSenderObject(
    socket,
    "new profile list",
    profiles,
    "sodi",
  ).sendContent();
  // selected profile
  console.log("-------------> selsected Profile : ", profiles, selectedProfile);
  new contentSenderObject(
    socket,
    "selected profile",
    profiles[selectedProfile],
    null,
  ).sendContent();
};
