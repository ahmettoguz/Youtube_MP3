const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");
const ytService = require("../../service/ytService");

const getUrlInfo = async (req, res) => {
  const randomId = commonService.generateRandomWord();

  console.log(randomId);

  ytService.downloadToServer("https://youtu.be/tVu3fwCNTuU?list=RDDxTl2ZzTWJI", "asdf.mp3", "./");

  const data = dummy;
  return expressService.returnResponse(
    res,
    200,
    "Video information found!!!!!!!!.",
    data
  );
};

module.exports = getUrlInfo;
