const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoute = require("../route/apiRoute");
const healthCheckRoute = require("../route/healthCheckRoute");
const expressService = require("../service/expressService");

const runApp = () => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(bodyParser.json());

  // get middleware to log get request in backend
  app.use("/", expressService.displayRequestInfo, (req, res, next) => {
    next();
  });

  // naviage healthCheck endpoint
  app.use("/health-check", expressService.displayRequestInfo, healthCheckRoute);

  // direct api endpoint to route
  app.use("/api", expressService.displayRequestInfo, apiRoute);

  return app;
};

module.exports = runApp;
