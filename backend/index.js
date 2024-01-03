const dotenv = require("dotenv");
const runApp = require("./src/app/app");

const app = runApp();

dotenv.config();

setTimeout(() => {
  console.log("exitingg");
  process.exit(0); 
}, 5000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.info(`App is running on : http://localhost:${PORT}`)
);
