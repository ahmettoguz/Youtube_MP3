class expressServiceClass {
  returnResponse(res, statusCode, message, data = null) {
    const state = statusCode == 200 ? true : false;

    const jsonResult = {
      status: statusCode,
      state,
      message,
    };

    // add data if it is not null
    if (data != null) {
      jsonResult.data = data;
    }

    res.status(statusCode).json(jsonResult);
  }
}

const expressService = new expressServiceClass();
module.exports = expressService;
