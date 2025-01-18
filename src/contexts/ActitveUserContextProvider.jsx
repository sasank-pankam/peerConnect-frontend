import { createContext, useEffect, useState, useContext } from "react";
import { useWebSocket } from "./WebSocketContextProvider";

export const ActiveUserContext = createContext();

/**
 * @typedef {Object} UserContextValue
 * @property {string | null} currentActiveUser - The ID of the currently active user or `null` if no user is active.
 * @property {Function} setCurrentActiveUser - Function to set the active user.
 */

export const ActiveUserProvider = ({ children }) => {
  const [currentActiveUser, setCurrentActiveUser] = useState(null);

  const value = {
    currentActiveUser,
    setCurrentActiveUser,
  };

  return (
    <ActiveUserContext.Provider value={value}>
      {children}
    </ActiveUserContext.Provider>
  );
};
export const useActiveUser = () => useContext(ActiveUserContext);
