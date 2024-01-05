const sslService = require("./src/service/sslService");
const ServerWebsocketServiceClass = require("./src/service/serverWebsocketService");

const runApp = require("./src/app/app");

const dotenv = require("dotenv");
dotenv.config();

const app = runApp();

const PORT = process.env.PORT || 3000;

const isSslEnabled = true;

if (isSslEnabled) {
  // create https server
  const httpsServer = sslService.getHttpsServer(app);
  
  // set websocket service
  const serverWebsocketService = new ServerWebsocketServiceClass(443);
  serverWebsocketService.startWsServer(httpsServer);
  app.set("serverWebsocketService", serverWebsocketService);
  
  httpsServer.listen(PORT, () =>
    console.log(`Server is running on https://localhost:${PORT}`)
  );
} else {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}
