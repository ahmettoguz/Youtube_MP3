const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const ytService = require("../../service/ytService");
const fileService = require("../../service/fileService");
const path = require("path");

const getUrlInfo = async (req, res) => {
  const url = req.body.url;

  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // Check if the user's folder exists, and create it if not
  const userFolderPath = path.join(__dirname, "../../storage", `./${userId}`);
  fileService.createFolderIfNotExist(userFolderPath);

  // start download
  const status = await ytService.downloadToServer(
    url,
    path.join(userFolderPath)
  );

  // check state and return response
  if (status.state !== true) {
    return expressService.returnResponse(res, 400, status.message);
  }

  // return response
  return expressService.returnResponse(res, 200, status.message);
};

module.exports = getUrlInfo;
