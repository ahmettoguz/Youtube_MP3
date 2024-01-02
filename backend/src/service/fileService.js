const fs = require("fs");
const path = require("path");

class FileService {
  createFolderIfNotExist(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  async getFilesInFolder(folderPath) {
    try {
      const files = await new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });

      // Filter only files (not directories)
      const fileNames = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(folderPath, file);
          const stats = await new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
              if (err) {
                reject(err);
              } else {
                resolve(stats);
              }
            });
          });
          return stats.isFile() ? file : null;
        })
      );

      // Remove null values (directories)
      const filteredFileNames = fileNames.filter((file) => file !== null);

      return { status: true, data: filteredFileNames };
    } catch (err) {
      console.error("Error reading folder:", err);
      return { status: false };
    }
  }

  findMp3File(files) {
    console.log(files);
    return files.find((str) => str.endsWith(".mp3"));
  }
}

const fileService = new FileService();
module.exports = fileService;
