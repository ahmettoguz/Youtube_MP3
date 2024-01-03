const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const ytService = require("../../service/ytService");
const fileService = require("../../service/fileService");
const httpService = require("../../service/httpService");
const imageService = require("../../service/imageService");
const path = require("path");

const getUrlInfo = async (req, res) => {
  // get user id to use folder
  const userId = commonService.getHeaderValue(req, "user-id");

  // get image url to download cover image
  const coverImgUrl = req.body.videoBanner;

  // Check if the user's folder exists, and create it if not
  const songId = commonService.generateRandomWord();
  const userFolderPath = path.join(__dirname, "../../storage", userId, songId);
  fileService.createFolderIfNotExist(userFolderPath);

  // download cover image
  const imgResponse = await httpService.downloadImage(
    coverImgUrl,
    path.join(userFolderPath, "./cover.webp")
  );

  // check cover image
  if (!imgResponse.status) {
    return expressService.returnResponse(
      res,
      500,
      "Cover page cannot downloaded."
    );
  }

  // convert webp image to png image
  const convertStatus = await imageService.convertWebpToPng(
    path.join(userFolderPath, "./cover.webp"),
    path.join(userFolderPath, "./cover.png")
  );

  if (!convertStatus)
    return expressService.returnResponse(
      res,
      500,
      "Cover page cannot converted from webp to png."
    );

  // start download
  const status = await ytService.downloadToServer(path.join(userFolderPath));

  // check state and return response
  if (status.state !== true) {
    return expressService.returnResponse(res, 400, status.message);
  }

  // return response
  return expressService.returnResponse(res, 200, status.message, {
    convertedSongId: songId,
  });
};

module.exports = getUrlInfo;
