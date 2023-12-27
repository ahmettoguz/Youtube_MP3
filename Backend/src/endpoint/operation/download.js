const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  const filePath = path.join(__dirname, "../storage/famgek_77357");
  const fileName = "evdeki saat - rüyadasın (slowed & reverb).mp3";

  expressService.returnFile(res, filePath, fileName);

  // return response
  return expressService.returnResponse(res, 200, "heyoo");
};

module.exports = download;
