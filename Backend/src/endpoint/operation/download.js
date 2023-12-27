const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // create file of the music
  const musicName = "evdeki saat - rüyadasın (slowed & reverb).mp3";
  const filePath = path.join(
    __dirname,
    "../../storage/famgek_77357",
    musicName
  );

  // return music file to clients
  await expressService.returnFile(res, filePath, musicName);
};

module.exports = download;
