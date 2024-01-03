const dotenv = require("dotenv");
const runApp = require("./src/app/app");

const app = runApp();

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.info(`App is running on : http://localhost:${PORT}`)
);
