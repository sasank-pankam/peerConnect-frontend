import { createContext, useEffect, useState, useContext } from "react";
import { useWebSocket } from "./WebSocketContextProvider";

export const UsersContext = createContext();

/**
 * @typedef {Object} UserContextValue
 * @property {Array<{ id: number }>} users - A list of users, each having an `id`.usercon
 * @property {Function} setUsers - Function to update the list of users.
 * @property {Object.<number, Object>} userDetails - A mapping of user IDs to their details (name and possibly more).
 * @property {Function} setUserDetails - Function to update user details.
 */
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const { registerHandler } = useWebSocket();

  const value = {
    users,
    setUsers,
    userDetails,
    setUserDetails,
  };

  useEffect(() => {
    console.info("Adding handle 1new peer");
    registerHandler("1new peer", (message) => {
      console.log(message);
      const { peerId, content } = message;
      if (users.includes(peerId)) return;
      setUsers((prev) => [...prev, peerId]);
      setUserDetails((prev) => ({
        ...prev,
        [peerId]: {
          ...content,
        },
      }));
    });

    console.info("Adding handle 1sync users");
    registerHandler("1sync users", (message) => {
      console.log(message);
      const { content } = message;
      const usersSet = new Set(users);
      const peers = content.filter((peer) => !usersSet.has(peer.peerId));
      const peerIds = peers.map((peer) => peer.peerId);
      setUsers((prev) => [...prev, peerIds]);
      setUserDetails((prev) => ({
        ...prev,
        ...Object.fromEntries(peers.map((peer) => [peer.peerId, peer])),
      }));
    });
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
export const useUser = () => useContext(UsersContext);
