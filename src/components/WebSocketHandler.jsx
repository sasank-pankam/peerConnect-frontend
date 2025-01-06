import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";

/**
 * @param {string} url - The WebSocket URL to connect to.
 * @param {(socket: WebSocket) => void} [initial] - An optional function called when the socket opens.
 * @returns {[WebSocket | null, React.Dispatch<React.SetStateAction<WebSocket | null>>]} - A tuple with the WebSocket instance and a function to update it.
 */
export const useSocketWithHandshake = (url, initial = () => { }) => {
  const [socket, setSocket] = useState(() => {
    const webSocket = new WebSocket(url);

    // let name = "";

    webSocket.addEventListener("open", () => {
      // name = initial(webSocket);
      initial(webSocket);
      setSocket(webSocket);
    });

    // webSocket.addEventListener("close", () => {
    //   console.log(`connection closed ${name}`);
    // });

    return webSocket;
  });

  // useEffect(() => {
  //   const webSocket = new WebSocket(url);
  //
  //   webSocket.addEventListener("open", () => {
  //     initial(webSocket);
  //     setSocket(webSocket);
  //   });
  //
  //   return () => {
  //     webSocket.close();
  //   };
  // }, []);
  //
  return [socket, setSocket];
};
