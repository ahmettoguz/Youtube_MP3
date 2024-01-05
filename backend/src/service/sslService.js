const fs = require("fs");
const path = require("path");

class SslService {
  constructor() {
    this.httpsServer = null;
  }

  getCredentials() {
    try {
      const certificate = fs.readFileSync(
        path.join(__dirname, "../keys", "fullchain.pem"),
        "utf8"
      );

      const privateKey = fs.readFileSync(
        path.join(__dirname, "../keys", "privkey.pem"),
        "utf8"
      );

      const credentials = { key: privateKey, cert: certificate };
      return credentials;
    } catch (error) {
      console.log("SSL key files cannot found!");
      return false;
    }
  }

  setHttpsServer(httpsServer) {
    this.httpsServer = httpsServer;
  }

  getHttpsServer() {
    return this.httpsServer;
  }
}

const sslService = new SslService();
module.exports = sslService;
