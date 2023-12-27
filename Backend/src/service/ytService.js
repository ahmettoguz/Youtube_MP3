const yt = require("yt-converter");
const commonService = require("./commonService");
const serverWebsocketService = require("./serverWebsocketService");

class YtService {
  constructor() {
    this.videoUrl = null;
    this.downloadProgress = null;
    this.lastDownloadProgress = null;
  }

  async getUrlInfo(url) {
    try {
      const info = await yt.getInfo(url);
      this.videoUrl = url;
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

  onConverting = (data) => {
    this.downloadProgress = Math.round(data);

    if (
      (this.downloadProgress > this.lastDownloadProgress + 15 ||
        this.downloadProgress == 100) &&
      this.lastDownloadProgress != 100
    ) {
      // send message to client with websocket
      serverWebsocketService.sendMessageToClient(
        serverWebsocketService.getCurrentClientId,
        {
          status: "converting",
          category: "convert",
          message: "music converting",
          data: this.downloadProgress,
        }
      );

      // set last progress
      this.lastDownloadProgress = this.downloadProgress;
      console.log(this.downloadProgress);
    }
  };

  onCovertFinished = () => {
    // send message to client with websocket
    serverWebsocketService.sendMessageToClient(
      serverWebsocketService.getCurrentClientId,
      {
        status: "completed",
        category: "convert",
        message: "music converted",
      }
    );

    console.log("convert finished");
  };

  async downloadToServer(filePath) {
    this.downloadProgress = 0;
    this.lastDownloadProgress = 0;
    const status = await yt.convertAudio(
      {
        url: this.videoUrl,
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
