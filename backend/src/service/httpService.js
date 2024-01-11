const axios = require("axios");
const fs = require("fs");

class HttpService {
  // const result = await downloadImage(imageUrl, destinationPath);
  async downloadImage(url, destinationPath) {
    try {
      const response = await axios({
        url: url,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream(destinationPath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      return { status: true, message: "Image downloaded successfully" };
    } catch (error) {
      return {
        status: false,
        message: `Error downloading image: ${error.message}`,
      };
    }
  }
}

const httpService = new HttpService();
module.exports = httpService;

// Example usage:
const imageUrl =
  "https://static.npmjs.com/attachments/ck3uwg119mt16dr740oqtw1be-wombat-header-pro.png";
const destinationPath = "coverPage.jpg";
