class ExpressHelperClass {
  async returnSuccessMessage(res, message, data) {
    const jsResult = {
      status: 200,
      state: true,
      message: message,
    };
    if (data != null) jsResult["data"] = data;
    res.status(200).json(jsResult);
  }

  async returnFailMessage(res, statusCode, errorMessage) {
    const jsResult = {
      status: statusCode,
      state: false,
      errorMessage: errorMessage,
    };
    res.status(statusCode).json(jsResult);
  }
}

const expressHelper = new ExpressHelperClass();
module.exports = expressHelper;
