const backendHealthCheck = require("./health-check/backendHealthCheck");
const websocketHealthCheck = require("./health-check/websocketHealthCheck");
const getUrlInfo = require("./operation/getUrlInfo");
const convert = require("./operation/convert");
const download = require("./operation/download");

const endpoint = {
  backendHealthCheck,
  websocketHealthCheck,
  getUrlInfo,
  convert,
  download
};

module.exports = endpoint;
