import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";

/**
 * @param {string} url - The WebSocket URL to connect to.
 * @param {(message: MessageEvent) => void} validator - A function to validate or process incoming messages.
 * @param {(socket: WebSocket) => void} [initial] - An optional function called when the socket opens.
 * @returns {[WebSocket | null, React.Dispatch<React.SetStateAction<WebSocket | null>>]} - A tuple with the WebSocket instance and a function to update it.
 */
export const useSocketWithHandler = (url, validator, initial = () => { }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.addEventListener("open", () => {
      initial(webSocket);
      setSocket(webSocket);
    });

    webSocket.addEventListener("message", (event) => {
      const receivedMessage = event.data;
      const message = JSON.parse(receivedMessage);
      console.log("******message****: ", receivedMessage);
      validator(message);
    });

    // Clean up on unmount
    return () => {
      webSocket.close();
    };
  }, []);

  return [socket, setSocket];
};
