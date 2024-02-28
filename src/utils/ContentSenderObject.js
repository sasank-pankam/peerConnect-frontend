export class contentSenderObject {
  constructor(webSocket, dataToBeSentToBackend) {
    this.content = JSON.stringify(dataToBeSentToBackend);
    this.webSocket = webSocket;
  }
  sendContent() {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(this.content);
    } else {
      console.log(`WebSocket connection is not open. Message is: ${this.content}`);
    }
  }
}
