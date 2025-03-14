import consts from "../Constants";
import { Message } from "./Message";

/**
 * @param {WebSocket} socket
 * @returns {{addHandle:Function, removeHandle:Function}}
 */
const recvHandler = (socket) => {
  const url = socket.url;
  /**
   * Fallback function when none of the keys match the current one in the registry.
   * @param {Message} message
   */
  const defaultfunc = (message) => {
    console.log(`Got ${JSON.stringify(message)} in socket with ${url}`);
  };

  const registery = new Map();

  /**
   *
   * @param {Message} message
   */
  const processMessage = (message) => {
    const handler = registery.get(message.header) || defaultfunc;
    handler(message);
  };

  /** adds handle for a message type
   * @param {string} key
   * @param {Function} func
   */
  const addHandle = (key, func) => {
    registery.set(key, func);
  };

  /** removes handle of a message type
   * @param {string} key
   */
  const removeHandle = (key) => {
    registery.delete(key);
  };

  socket.addEventListener("message", (event) => {
    const message = new Message();
    console.log(message);
    Object.assign(message, JSON.parse(event.data));
    processMessage(message);
  });
  return { addHandle, removeHandle };
};

/**
 * @param {WebSocket} messagesSocket
 * @param {WebSocket} signalsSocket
 * @returns {{  registerHandler:Function, unRegisterHandler:Function}}
 */
export const recvRegistery = (messagesSocket, signalsSocket) => {
  if (!(messagesSocket && signalsSocket)) {
    return {
      registerHandler: null,
      unRegisterHandler: null,
    };
  }
  const messages = recvHandler(messagesSocket);
  const signals = recvHandler(signalsSocket);
  const socMap = new Map([
    [consts.MESSAGES, messages],
    [consts.SIGNALS, signals],
  ]);
  const registerHandler = (header, func) => {
    console.info(`registerred ${header}!`);
    const type = header[0];
    const handler = socMap.get(type);
    handler.addHandle(header, func);
  };

  const unRegisterHandler = (header) => {
    const type = header[0];
    const handler = socMap.get(type);
    handler.removeHandle(header);
  };

  return {
    registerHandler,
    unRegisterHandler,
  };
};
