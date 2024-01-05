/* eslint-disable */
"use strict";

class ClientWebsocketService {
  constructor() {
    this.webSocket = null;
    this.connectionStatus = null;
    this.allMessages = [];
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  connectWebsocket(errorCallback) {
    return new Promise((resolve, reject) => {
      try {
        const hostName = process.env.VUE_APP_SERVER_HOST || "localhost";
        const websocketPort =
          process.env.VUE_APP_SERVER_WEBSOCKET_PORT || "8080";
        this.webSocket = new WebSocket(`wss://${hostName}:${websocketPort}`);

        console.log(`wss://${hostName}:${websocketPort}`);
        console.log(this.webSocket);

        this.webSocket.onopen = () => {
          this.connectionStatus = true;
          resolve({ state: true });
        };

        this.webSocket.onerror = (error) => {
          // console.error("WebSocket connection error:", error);
          this.connectionStatus = false;
          resolve({ state: false });
        };

        this.webSocket.onclose = (event) => {
          console.log("WebSocket closed:", event);
          this.connectionStatus = false;
          errorCallback();
          resolve({ state: false });
        };
      } catch (err) {
        // console.error("Error connecting WebSocket:", err);
        this.connectionStatus = false;
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
