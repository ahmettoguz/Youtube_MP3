"use strict";

class ClientWebsocketService {
  constructor() {
    this.webSocket = null;
    this.allMessages = [];
  }

  connectWebsocket() {
    return new Promise((resolve, reject) => {
      try {
        this.webSocket = new WebSocket(`ws://localhost:8080`);

        this.webSocket.onopen = () => {
          resolve({ state: true });
        };

        this.webSocket.onerror = (error) => {
          // console.error("WebSocket connection error:", error);
          resolve({ state: false });
        };
      } catch (err) {
        // console.error("Error connecting WebSocket:", err);
        resolve({ state: false });
      }
    });
  }

  sendMessage(message) {
    try {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  receiveMessage(callback) {
    try {
      this.webSocket.onmessage = (message) => {
        const incomingMessage = JSON.parse(message.data);
        this.allMessages.unshift(incomingMessage);
        callback(incomingMessage);
      };
    } catch (err) {
      console.error("Error receiving message:", err);
    }
  }

  closeWebSocket() {
    try {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.close();
      } else {
        console.error("WebSocket is not open. Cannot close.");
      }
    } catch (err) {
      console.error("Error closing WebSocket:", err);
    }
  }

  handleWebSocketError(callback) {
    this.webSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      callback(error);
    };
  }
}

const clientWebsocketService = new ClientWebsocketService();
export default clientWebsocketService;
