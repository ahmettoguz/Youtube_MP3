const expressService = require("../../service/expressService");

const backendHealthCheck = async (req, res) => {
  return expressService.returnResponse(res, 200, "Service is up.");
};

module.exports = backendHealthCheck;
