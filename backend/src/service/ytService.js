const yt = require("yt-converter");
const commonService = require("./commonService");

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

      // adjust song name and author for different situation
      let songName = null;
      let songAuthor = null;
      if (info.title.split(" - ")[1] != undefined) {
        songName = info.title.split(" - ").slice(1).join(" - ");
        songAuthor = info.title.split(" - ")[0];
      } else {
        songName = info.title.split(" - ")[0];
        songAuthor = info.author.name.split(" - ")[0];
      }

      return {
        convertedSongName: `${info.title}.mp3`,
        songName,
        songAuthor,
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
      this.serverWebsocketService.sendMessageToClient(
        this.serverWebsocketService.getCurrentClientId,
        {
          status: "converting",
          category: "convert",
          message: "music converting",
          data: this.downloadProgress,
        }
      );

      // set last progress
      this.lastDownloadProgress = this.downloadProgress;
      console.log("Converting:", this.downloadProgress + "%");
    }
  };

  onCovertFinished = () => {
    // send message to client with websocket
    this.serverWebsocketService.sendMessageToClient(
      this.serverWebsocketService.getCurrentClientId,
      {
        status: "completed",
        category: "convert",
        message: "music converted",
      }
    );

    console.log("Convert finished");
  };

  async downloadToServer(req, filePath) {
    this.serverWebsocketService = req.app.get("serverWebsocketService");

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
