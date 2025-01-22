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
  const [users, setUsers] = useState([1, 2, 3, 4, 5, 6]);
  const [userDetails, setUserDetails] = useState({
    [1]: { name: "test-1" },
    [2]: { name: "test-2" },
    [3]: { name: "test-3" },
    [4]: { name: "test-4" },
    [5]: { name: "test-5" },
    [6]: { name: "test-6" },
  });

  const value = {
    users,
    setUsers,
    userDetails,
    setUserDetails,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
export const useUser = () => useContext(UsersContext);
