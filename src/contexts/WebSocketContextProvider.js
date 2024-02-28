import { createContext, useContext } from "react";

export const WebSocketContext = createContext({
    socket: null,
    setSocket: () => {},

});

export const WebSocketContextProvider = WebSocketContext.Provider;

export const useWebSocket = () => useContext(WebSocketContext);

