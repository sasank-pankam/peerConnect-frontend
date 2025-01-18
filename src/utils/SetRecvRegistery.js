import { useEffect } from "react";
import consts from "../Constants";
import { Provider } from "react-redux";
import { useUser } from "../contexts/UsersContextProvider";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { Message } from "./Message";

// Functions to add and remove users
const addUser = (message, props) => {
  const { setUsers, setUserDetails, users } = props;
  const id = message.peerId;
  if (users.find((userId) => userId === id) !== undefined) {
    return;
  }
  setUsers((prevUsers) => {
    return [...prevUsers, id];
  });
  setUserDetails((prevDetails) => {
    return { ...prevDetails, [id]: message.content };
  });
};

const USERID = 0;
const USERDETAILS = 1;
const addPeers = (newUsers, props) => {
  const { users, setUsers, setUserDetails } = props;
  const usesSet = new Set(users);
  const filteredUsers = newUsers.filter((user) => {
    return usesSet.has(user[USERID]);
  });
  setUsers((prevUsers) => {
    return [...prevUsers, ...filteredUsers.map((user) => user[USERID])];
  });
  setUserDetails((prevDetails) => {
    return {
      ...prevDetails,
      ...Object.fromEntries(filteredUsers),
    };
  });
};

const removeUser = (id, props) => {
  const { setUsers, setUserDetails } = props;
  let found = false;
  setUsers((prevUsers) => {
    return prevUsers.filter((user) => {
      if (user.id === id) found = true;
      return user.id !== id;
    });
  });
  if (!found) {
    return;
  }
  setUserDetails((prevDetails) => {
    const temp = { ...prevDetails };
    delete temp[id];
    return temp;
  });
};

// assuming
// content = [Peers]

/**
 * @param {Message} message
 * @param {Object} props
 */
const updatePeers = (message, props) => {
  const { setUsers } = props;
  const peers = message.content;
  addPeers(peers);
};

const useWapWithProps = (func) => {
  // const props = useUser();
  return (message) => {
    func(message, props);
  };
};

export const useSetRecvRegistery = () => {
  // const props = useUser();
  const { sender, registerHandler, unRegisterHandler } = useWebSocket();
  useEffect(() => {
    registerHandler(consts.HANDLE_SEND_PEER_LIST, useWapWithProps(updatePeers));

    return () => {
      unRegisterHandler(consts.HANDLE_SEND_PEER_LIST);
    };
  }, []);
};
