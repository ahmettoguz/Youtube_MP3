const expressService = require("../../service/expressService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // return response
  return expressService.returnResponse(res, 200, "heyoo");
};

module.exports = download;
