import { dataSender } from "./Sender";
import consts from "../Constants";

/**
 * @param {WebSocket} messagesSocket
 * @param {WebSocket} signalsSocket
 * @returns {Function}
 */
export const sendRegistery = (messagesSocket, signalsSocket) => {
  if (!(messagesSocket && signalsSocket)) {
    return null;
  }
  const messagesSender = dataSender(messagesSocket, { name: "MESSAGES" });
  const signalSSender = dataSender(signalsSocket, { name: "SIGNALS" });

  const senderMap = new Map([
    [consts.SIGNALS, signalSSender],
    [consts.MESSAGES, messagesSender],
  ]);

  /**
   * @param {import('./Message').Message} message
   */
  const messageSender = (message) => {
    const type = Number(message.header[0]);
    const sender = senderMap.get(type);
    sender(message);
  };
  return messageSender;
};
