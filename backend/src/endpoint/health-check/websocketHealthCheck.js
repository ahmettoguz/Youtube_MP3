const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");

const websocketHealthCheck = async (req, res) => {
  // use variable which is setted on app file
  const serverWebsocketService = req.app.get("serverWebsocketService");

  // get user id and set it to websocket client id
  const userId = commonService.getHeaderValue(req, "user-id");

  // start connection
  serverWebsocketService.connectClient(userId);

  // check user connection to send message
  if (!serverWebsocketService.isUserConnected(userId))
    return expressService.returnResponse(
      res,
      500,
      "Cannot verified that client connection to websocket."
    );

  // send message to client
  serverWebsocketService.sendMessageToClient(
    serverWebsocketService.getCurrentClientId,
    {
      status: "connected",
      category: "health check",
      message: "websocket health check",
    }
  );

  return expressService.returnResponse(res, 200, "Websocket message is send.");
};

module.exports = websocketHealthCheck;
