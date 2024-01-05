const sslService = require("./src/service/sslService");
const https = require("https");

const runApp = require("./src/app/app");

const dotenv = require("dotenv");
dotenv.config();

const app = runApp();

const PORT = process.env.PORT || 3000;

const isSslEnabled = true;

if (isSslEnabled) {
  const httpsServer = https.createServer(sslService.getCredentials(), app);
  httpsServer.listen(PORT, () =>
    console.log(`Server is running on https://localhost:${PORT}`)
  );
} else {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}
