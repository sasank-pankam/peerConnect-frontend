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
}
