const { Router } = require("express");
const router = Router();

const endpoint = require("../endpoint/endpoint");

// route to endpoints
router.route("/getUrlInfo").post(endpoint.getUrlInfo);

module.exports = router;
