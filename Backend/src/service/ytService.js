const yt = require("yt-converter");
const commonService = require("./commonService");

class YtService {
  constructor() {
    this.downloadProgress = null;
  }

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

  onConverting(data) {
    console.log(data);
  }

  onCovertFinished() {
    console.log("convert finished");
  }

  async downloadToServer(url, filePath) {
    const status = await yt.convertAudio(
      {
        url: url,
        itag: 140,
        directoryDownload: filePath,
      },
      this.onConverting,
      this.onCovertFinished
    );

    if (status != undefined) {
      return {
        state: true,
        message: "Video is started to converting in server.",
      };
    } else {
      return {
        state: false,
        message: "Video cannot converted in server!",
      };
    }
  }
}

const ytService = new YtService();
module.exports = ytService;
