const expressService = require("../../service/expressService");
const commonService = require("../../service/commonService");

const getUrlInfo = async (req, res) => {
  const randomId = commonService.generateRandomWord();

  console.log(randomId);

  data = "dummy";

  return expressService.returnResponse(
    res,
    200,
    "Video information found!!!!!!!!.",
    data
  );
};

module.exports = getUrlInfo;
