const { Router } = require("express");
const router = Router();

const endpoint = require("../endpoint/endpoint");

// route to endpoints
router.route("/getUrlInfo").post(endpoint.getUrlInfo);
router.route("/convertUrl").post(endpoint.convert);

module.exports = router;
