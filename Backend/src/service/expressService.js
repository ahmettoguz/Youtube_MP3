class ExpressService {
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

  displayRequestInfo(req, res, next) {
    console.info(
      `\n-------------------------\n-------------------------\nIncoming request to: ${req.url}\nMethod: ${req.method}\nIp: ${req.connection.remoteAddress}\n-------------------------\n-------------------------\n\n`
    );

    next();
  }
}

const expressService = new ExpressService();
module.exports = expressService;
