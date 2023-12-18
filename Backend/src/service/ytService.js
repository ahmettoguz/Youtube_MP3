const yt = require("yt-converter");
const commonService = require("./commonService");

class YtService {
  async getUrlInfo(url) {
    try {
      const info = await yt.getInfo(url);
      return {
        songName: info.title,
        imgUrl: info.thumbnails[info.thumbnails.length - 1].url,
        songLength: commonService.formatTime(info.lengthSeconds),
        status: true,
      };
    } catch (error) {
      return { status: false, errorMessage: "Video url info cannot resolved." };
    }
  }
}

const ytService = new YtService();
module.exports = ytService;
