/**
 * @type {MessageType}
 */
export class Message {
  constructor(header, content, peerId, msgId) {
    this.header = header;
    this.content = content;
    this.peerId = peerId;
    this.msgId = msgId;
  }

  fromJSON = (data) => {
    const { content, header, peerId, msgId } = data;
    return Message(header, content, peerId, msgId);
  };
}
