const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const fileService = require("../../service/fileService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // get music id
  const convertedSongId = req.body.convertedSongId;

  // get music name from folder
  const musicName = (
    await fileService.getFilesInFolder(
      path
        .join(__dirname, `../../storage/${userId}/${convertedSongId}`)
        .toString()
    )
  ).data[0];

  // create file of the music
  const filePath = path.join(
    __dirname,
    `../../storage/${userId}/${convertedSongId}`,
    musicName
  );

  // return music file to clients
  await expressService.returnFile(res, filePath);
};

module.exports = download;
