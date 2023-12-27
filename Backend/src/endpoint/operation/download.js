const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // get music name
  const musicName = req.body.musicName;

  // create file of the music
  const filePath = path.join(__dirname, `../../storage/${userId}`, musicName);

  // return music file to clients
  await expressService.returnFile(res, filePath);
};

module.exports = download;
