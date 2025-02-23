import { dataSender } from "./Sender";
import consts from "../Constants";

/**
 * @param {WebSocket} messagesSocket
 * @param {WebSocket} signalsSocket
 * @returns {Function}
 */
export const sendRegistery = (messagesSocket, signalsSocket) => {
  if (!(messagesSocket && signalsSocket)) {
    return (message) => {
      console.log(
        "not sending message but this gets sent when connnected.",
        message,
      );
    };
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
    const type = message.header[0];
    const sender = senderMap.get(type);

    sender(message);
  };
  return messageSender;
};
