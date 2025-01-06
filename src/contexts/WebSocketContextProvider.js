import { createContext, useContext } from "react";

/**
 * @typedef {Object} websocketContextValue
 * @property {(message: import('../utils/Message').Message) => void} sender - Function to send a message via the messages socket.
 */

/**
 * @type {React.Context<websocketContextValue>}
 */
export const WebSocketContext = createContext({
  sender: () => { },
});
export const WebSocketContextProvider = WebSocketContext.Provider;
export const useWebSocket = () => useContext(WebSocketContext);
