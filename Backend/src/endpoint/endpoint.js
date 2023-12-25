const getUrlInfo = require("./operation/getUrlInfo");
const convert = require("./operation/convert");
const backendHealthCheck = require("./health-check/backendHealthCheck");
const websocketHealthCheck = require("./health-check/websocketHealthCheck");

const endpoint = {
  backendHealthCheck,
  websocketHealthCheck,
  getUrlInfo,
  convert,
};

module.exports = endpoint;
