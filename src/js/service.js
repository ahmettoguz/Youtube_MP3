const yt = require("yt-converter");
const functions = require("./functions");

class Service {
  async getUrlInfo(url) {
    try {
      const info = await yt.getInfo(url);
      const singerSong = info.title.split(" - ");
      return {
        songName: singerSong[0],
        singerName: singerSong[1],
        imgUrl: info.thumbnails[info.thumbnails.length - 1].url,
        songLength: functions.formatTime(info.lengthSeconds),
        status: true,
      };
    } catch (error) {
      return { status: false, errorMessage: "Video url info cannot resolved." };
    }
  }
}

const appService = new Service();
module.exports = appService;
