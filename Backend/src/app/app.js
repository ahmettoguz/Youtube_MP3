const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const route = require("../route/route");
const expressService = require("../service/expressService");

const runApp = () => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(bodyParser.json());

  // healthCheck endpoint as get
  app.get("/", expressService.displayRequestInfo, (req, res) => {
    expressService.returnResponse(res, 200, "Service is up.");
  });

  // direct api endpoint to route
  app.use("/api", expressService.displayRequestInfo, route);
  return app;
};

module.exports = runApp;
