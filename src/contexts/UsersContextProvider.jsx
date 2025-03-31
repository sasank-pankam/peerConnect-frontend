import { createContext, useEffect, useState, useContext } from "react";
import { useWebSocket } from "./WebSocketContextProvider";
import { addUsersWithoutDuplicates } from "../utils/actions";
import { Message } from "../utils/Message";

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
      addUsersWithoutDuplicates([message.content], setUsers, setUserDetails);
    });
    // registerHandler("1new peer", (message) => {
    //   addUsersWithoutDuplicates([message.content], setUsers, setUserDetails);
    // });

    console.info("Adding handle 1sync users");
    registerHandler("1sync users", (message) => {
      const msg = Message.fromJSON(message);
      addUsersWithoutDuplicates(msg.content, setUsers, setUserDetails);
    });
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
export const useUser = () => useContext(UsersContext);
