/**
 * Provides a function that sends the messages in desired formart.
 * @param {WebSocket} websocket - The WebSocket instance used for communication.
 * @param {Object} [props] - Additional properties to configure the sender.
 * @param {string} [props.name] - Optional name of the WebSocket connection.
 * @returns {(header: string, content: Object, peerId: string, msgId: string, otherProps?: Object) => void | null}
 * - The `sendContent` function if the WebSocket is valid, otherwise `null`.
 */
export const useContentSender = (websocket, props = {}) => {
  const { name } = props;
  const url = websocket?.url;

  /**
   * Sends a message to the WebSocket server.
   * @param {string} header - Header of the message.
   * @param {Object} content - Body of the message.
   * @param {string} peerId - Active peer that the user is currently viewing.
   * @param {string} msgId - ID for this specific message.
   * @param {Object} [otherProps] - Other optional message-specific properties.
   * @returns {void}
   */
  const sendContent = (header, content, peerId, msgId, otherProps = {}) => {
    const contentToSend = JSON.stringify({
      header,
      content,
      peerId,
      msgId,
      ...otherProps,
    });
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      console.log(`Sent data: ${contentToSend}`);
      websocket.send(contentToSend);
    } else {
      console.log(
        `WebSocket connection is not open at ${url} named ${name}. Message is: ${contentToSend}`,
      );
    }
  };

  return websocket ? sendContent : null;
};
