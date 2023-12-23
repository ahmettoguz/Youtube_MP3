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

  // get middleware to log get request in backend
  app.use("/", expressService.displayRequestInfo, (req, res, next) => {
    next();
  });

  // healthCheck endpoint as get
  app.get("/healthCheck", (req, res, next) => {
    expressService.returnResponse(res, 200, "Service is up.");
  });

  // direct api endpoint to route
  app.use("/api", expressService.displayRequestInfo, route);
  return app;
};

module.exports = runApp;
