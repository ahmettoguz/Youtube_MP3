const fs = require("fs");

class FileService {
  createFolderIfNotExist(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
}

const fileService = new FileService();
module.exports = fileService;
