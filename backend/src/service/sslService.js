const https = require("https");
const fs = require("fs");
const path = require("path");

class SslService {
  constructor() {
    this.expressApp = null;
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

  getHttpsServer(expressApp) {
    this.expressApp = expressApp;
    return https.createServer(this.getCredentials(), expressApp);
  }

  getWssServer() {
    return https.createServer(this.getCredentials(), this.expressApp);
  }
}

const sslService = new SslService();
module.exports = sslService;
