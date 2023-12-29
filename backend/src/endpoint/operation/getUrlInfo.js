const ytService = require("../../service/ytService");
const expressService = require("../../service/expressService");

const getUrlInfo = async (req, res) => {
  const url = req.body.url;
  const data = await ytService.getUrlInfo(url, res);

  // check result
  if (data.status === false) {
    return expressService.returnResponse(res, 400, data.errorMessage);
  }

  return expressService.returnResponse(
    res,
    200,
    "Video information found.",
    data
  );
};

module.exports = getUrlInfo;
