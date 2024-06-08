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
*/

const useGetProfiles = (socket) => {
  const [profiles, setProfiles] = useState([]);
  const messageFunc = (event) => {
    const data = event.data;
    const profiles = JSON.parse(data.content);
    const profilesArray = Array.from(
      Object.entries(profiles),
      ([key, value]) => ({
        owner: key,
        changed: key,
        confs: value,
      }),
    );
    setProfiles(profilesArray);
  };
  useEffect(() => {
    if (!socket) {
      setProfiles([
        {
          owner: "ali",
          confs: {
            ip: "172.168.0.1",
            port: 2020,
          },
          changed: "ali",
        },
        {
          owner: "sasank",
          confs: {
            ip: "172.168.0.1",
            port: 2020,
          },
          changed: "sasank",
        },
        {
          owner: "admin",
          confs: {
            ip: "172.168.0.1",
            port: 2020,
          },
          changed: "admin",
        },
      ]);
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
              ["username"]: profile.owner,
              ["server_port"]: profile.confs.port,
            },
            username: profile.changed,
          },
        ];
      }),
    ),
    ["id"]: null,
  };
};

export const sendProfiles = (socket, profiles) => {
  new contentSenderObject(socket, getChangedProfiles(profiles)).sendContent();
};
