import { Message } from "./Message";

/**
 * @param {WebSocket} socket
 */
const waitForOpen = (socket) => {
  return new Promise((resolve, reject) => {
    if (socket.readyState === WebSocket.OPEN) {
      resolve();
    } else {
      const onOpen = () => {
        socket.removeEventListener("open", onOpen);
        resolve();
        console.log("websocket connected!");
      };
      const onError = (err) => {
        console.log("Connection lost: ", err);
        reject(new Error("WebSocket connection failed."));
      };

      socket.addEventListener("open", onOpen);
      socket.addEventListener("error", onError);
    }
  });
};

/**
 * Provides a function that sends the messages in desired formart.
 * @param {WebSocket} websocket - The WebSocket instance used for communication.
 * @param {Object} [props] - Additional properties to configure the sender.
 * @param {string} [props.name] - Optional name of the WebSocket connection.
 * @returns {(message: Message) => void | null}
 * - The `sendContent` function if the WebSocket is valid, otherwise `null`.
 */
export const dataSender = (websocket, props = {}) => {
  const { name } = props;
  const url = websocket?.url;

  /**
   * Sends a message to the WebSocket server.
   * @param {Message} message
   * @returns {void}
   */
  const sendContent = async (message) => {
    const contentToSend = JSON.stringify(message);
    try {
      websocket.send(contentToSend);
      console.log(`Sent data: ${contentToSend}`);
      return;
    } catch (e) {
      if (websocket.readyState === WebSocket.CONNECTING) {
        await waitForOpen(websocket);
        await sendContent(message);
        return;
      }

      console.log(`unable to send a message: ${contentToSend}`);
    }
  };
  return websocket ? sendContent : null;
};
