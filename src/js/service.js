const yt = require("yt-converter");
const functions = require("./functions");

class Service {
  getUrlInfo(url) {
    return yt.getInfo(url).then((info) => {
      return {
        songName: info.title,
        imgUrl: info.thumbnails[info.thumbnails.length - 1].url,
        songLength: functions.formatTime(info.lengthSeconds),
      };
    });
  }
}

const appService = new Service();
module.exports = appService;
