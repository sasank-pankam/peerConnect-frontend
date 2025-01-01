import { createContext, useContext } from "react";

/**
 * @typedef {Object} websocketContextValue
 * @property {WebSocket | null} messagesSocket - Socket used for messages.
 * @property {(WebSocket | null) => void} setMessagesSocket - Function that sets the state of the messages socket.
 * @property {WebSocket | null} signalsSocket - Socket used for signals.
 * @property {(WebSocket | null) => void} setSignalsSocket - Function that sets the state of the signals socket.
 * @property {boolean} setSessionEnd - Flag that triggers the program end.
 * @property {Object} senders - Object containing sender functions for messages and signals.
 * @property {(header: string, content: Object, peerId: string, msgId: string, otherProps: Object) => void} senders.messageSender - Function to send a message via the messages socket.
 * @property {(header: string, content: Object, peerId: string, msgId: string, otherProps: Object) => void} senders.signalSender - Function to send a signal via the signals socket.
 */

/**
 * @type {React.Context<websocketContextValue>}
 */
export const WebSocketContext = createContext({
  messagesSocket: null,
  setMessagesSocket: () => { },
  signalsSocket: null,
  setSignalsSocket: () => { },
  setSessionEnd: false,
  senders: {
    messageSender: () => { },
    signalSender: () => { },
  },
});
export const WebSocketContextProvider = WebSocketContext.Provider;
export const useWebSocket = () => useContext(WebSocketContext);
