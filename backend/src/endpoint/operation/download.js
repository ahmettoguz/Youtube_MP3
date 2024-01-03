const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const fileService = require("../../service/fileService");
const imageService = require("../../service/imageService");
const path = require("path");

const download = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // get music id
  const convertedSongId = req.body.convertedSongId;

  // get music name from folder
  const files = (
    await fileService.getFilesInFolder(
      path
        .join(__dirname, `../../storage/${userId}/${convertedSongId}`)
        .toString()
    )
  ).data;
  const musicName = fileService.findMp3File(files);

  // create folder path
  const pathToFolder = path.join(
    __dirname,
    `../../storage/${userId}/${convertedSongId}`
  );

  // embed cover page
  const embedRes = imageService.embedCoverPage(
    path.join(pathToFolder, musicName),
    path.join(pathToFolder, "./cover.png")
  );
  // console.log(embedRes);

  // create file of the music
  const filePath = path.join(pathToFolder, musicName);

  // return music file to clients
  await expressService.returnFile(res, filePath);
};

module.exports = download;
