const { Router } = require("express");
const router = Router();

const endpoint = require("../endpoint/endpoint");

// route to endpoints
router.route("/backend").get(endpoint.backendHealthCheck);
router.route("/websocket").get(endpoint.websocketHealthCheck);

module.exports = router;
