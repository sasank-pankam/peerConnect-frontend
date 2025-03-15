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

  static fromJSON = (data) => {
    const { content, header, peerId, msgId } = data;
    return new Message(header, content, peerId, msgId);
  };
}
