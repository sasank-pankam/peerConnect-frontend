export class contentSenderObject {
  constructor(webSocket, header, content, id) {
    this.content = JSON.stringify({
      header,
      content,
      id,
    });
    this.webSocket = webSocket;
  }
  sendContent() {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(this.content);
      console.log(`sent data ${this.content}`);
    } else {
      console.log(
        `WebSocket connection is not open. Message is: ${this.content}`,
      );
    }
  }
}
