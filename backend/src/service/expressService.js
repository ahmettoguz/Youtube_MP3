const fs = require("fs");

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
      `\n---------------- Incoming Request ----------------\n` +
        `Endpoint: ${req.baseUrl}${req.url}\n` +
        `Method  : ${req.method}\n` +
        `IP      : ${req.connection.remoteAddress}\n` +
        `Body    : ${JSON.stringify(req.body, null, 2)}\n` +
        `--------------------------------------------------\n`
    );

    next();
  }

  async returnFile(res, file) {
    res.download(file);
  }
}

const expressService = new ExpressService();
module.exports = expressService;
