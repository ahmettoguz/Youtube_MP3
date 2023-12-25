const expressService = require("../../service/expressService");

const websocketHealthCheck = async (req, res) => {
  // TODO return websocket not http message to verify websocket endpoint
  return expressService.returnResponse(res, 200, "websocket is up.");
};

module.exports = websocketHealthCheck;
