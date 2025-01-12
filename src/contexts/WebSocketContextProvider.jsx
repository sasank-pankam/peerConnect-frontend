import { createContext, useContext } from "react";
import { useSocket } from "../utils/useSockets";

/**
 * @typedef {Object} websocketContextValue
 * @property {(message: import('../utils/Message').Message) => void} sender - Function to send a message via the messages socket.
 */

/**
 * @type {React.Context<websocketContextValue>}
 */
export const WebSocketContext = createContext();
// export const WebSocketContextProvider = WebSocketContext.Provider;

export const WebSocketProvider = ({ children }) => {
  const {
    signalsSocket,
    messagesSocket,
    registerHandler,
    sender,
    unRegisterHandler,
  } = useSocket();

  return (
    <WebSocketContext.Provider
      value={{
        signalsSocket,
        messagesSocket,
        registerHandler,
        sender,
        unRegisterHandler,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
/**
  * @returns {{
      sender: Function,
      signalsSocket: WebSocket,
      messsagesSocket: WebSocket,
      registerHandler: Function,
      unRegisterHandler: Function,
    * }} 
  */
export const useWebSocket = () => useContext(WebSocketContext);
