"use strict";
import commonService from "./commonService.js";
import clientWebsocketService from "./clientWebsocketService.js";

const serverUrl = "http://localhost";
const apiUrl = `${serverUrl}/api`;

Vue.createApp({
  data() {
    return {
      userLocalId: null,
      videoBanner: null,
      convertedSongName: null,
      songName: null,
      songAuthor: null,
      videoLenght: null,
      conversionProgress: null,
      stage: "initial",
      themeMode: null,
    };
  },

  methods: {
    async findMusic(e) {
      const videoUrlInput = $("#videoUrlInput").val();

      // remove previous information labels for input field
      $("#videoUrlInput").removeClass("is-valid");
      $("#videoUrlInput").removeClass("is-invalid");

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/getUrlInfo`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            url: videoUrlInput,
          }),
          beforeSend: () => {
            this.stage = "searchingVideo";
          },
          success: function (data) {
            resolve({ status: true, data: data });
          },
          error: function (error) {
            resolve({ status: false });
          },
        });
      });

      if (response.status) {
        const data = response.data.data;

        // change stage to display found music part
        this.stage = "videoFound";

        // get informations
        this.convertedSongName = data.convertedSongName;
        this.videoBanner = data.imgUrl;
        this.songName = data.songName;
        this.songAuthor = data.songAuthor;
        this.videoLenght = data.songLength;

        // display label for input field
        $("#videoUrlInput").addClass("is-valid");
      } else {
        // display label for input field
        $("#videoUrlInput").addClass("is-invalid");
      }
    },

    async convertMusic() {
      // check websocket connection
      if (!clientWebsocketService.getConnectionStatus()) {
        alert("Ws connection down!");
        return false;
      }

      // change stage
      this.stage = "converting";
      this.conversionProgress = 0;

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/convertUrl`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({}),
          headers: {
            "User-Id": this.userLocalId,
          },
          success: function (data) {
            resolve({ status: true, data: data });
          },
          error: function (error) {
            resolve({ status: false });
          },
        });
      });

      if (response.status == false) {
        alert("Convertion cannot performed!");
        return;
      }
    },

    async handleUserId() {
      // check if it is already setted
      this.userLocalId = localStorage.getItem("ytmp3Id");

      // if not set new one
      if (this.userLocalId == null)
        localStorage.setItem("ytmp3Id", commonService.generateRandomWord());
    },

    websocketMessageReceived(data) {
      console.log("Received websocket message:", data);

      // video conversion stages
      if (data.category == "convert") {
        if (data.status == "converting") {
          this.conversionProgress = data.data;
          this.stage = "converting";
        } else if (data.status == "completed") {
          this.conversionProgress = 100;

          // change stage with delay
          setTimeout(() => {
            this.stage = "converted";
          }, 700);
        }
      }
    },

    async checkWebsocketConnectivity() {
      // connect to websocket
      await clientWebsocketService.connectWebsocket();
      clientWebsocketService.receiveMessage(this.websocketMessageReceived);

      // send request to endpoint to receive healthcheck
      await new Promise((resolve, reject) => {
        $.ajax({
          url: `${serverUrl}/health-check/websocket`,
          type: "GET",
          contentType: "application/json",
          headers: {
            "User-Id": this.userLocalId,
          },
          data: JSON.stringify({}),
          success: function (data) {
            resolve({ state: true, data: data });
          },
          error: function (error) {
            resolve({ state: false });
          },
        });
      });

      // wait websocket message with waitUntil
      const status = await commonService.waitUntil(
        function () {
          if (clientWebsocketService.allMessages[0])
            return (
              clientWebsocketService.allMessages[0].message ==
              "websocket health check"
            );
          else return false;
        },
        5000,
        100
      );

      // check status and return
      if (!status) {
        console.log("Websocket connection couldn't establised");
        return false;
      }
      console.log("Websocket connection is successful.");
      return true;
    },

    async checkServerConnectivity() {
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${serverUrl}/health-check/backend`,
          type: "GET",
          contentType: "application/json",
          data: JSON.stringify({}),
          success: function (data) {
            resolve({ state: true, data: data });
          },
          error: function (error) {
            resolve({ state: false });
          },
        });
      });

      if (!response.state) {
        return false;
      }

      console.log("Backend server connection is successful.");
      return true;
    },

    async downloadMusic() {
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/download`,
          type: "POST",
          contentType: "application/json",
          headers: {
            "User-Id": this.userLocalId,
          },
          xhrFields: {
            responseType: "blob",
          },
          data: JSON.stringify({
            musicName: this.convertedSongName,
          }),
          beforeSend: () => {},
          success: function (data) {
            resolve({ status: true, data: data });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX request failed:", textStatus, errorThrown);
            resolve({ status: false });
          },
        });
      });

      console.log(response);

      // download operation with virtual link
      if (response.status && response.data) {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "audio/mp3" });

        // Create a download link
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${this.songName} - ${this.songAuthor}`;

        // Append the link to the document and trigger a click to start the download
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      } else {
        console.log("Download failed");
      }
      // download operation with virtual link end
    },

    toggleThemeMode() {
      // if (theme_Mode == "dark") {
      console.log(1);
      alert(1);
    },

    async initThemeMode() {
      this.themeMode = localStorage.getItem("yt-theme-mode");
      console.log(this.themeMode);
      if (this.themeMode == undefined || this.themeMode == null) {
        localStorage.setItem("yt-theme-mode", "light");
      }
    },

    async changeThemeMode(themeMode) {
      // set to localstorage
      localStorage.setItem("yt-theme-mode", themeMode);

      // change overall theme
      $("body").attr("data-bs-theme", this.themeMode);
    },
  },

  computed: {
    foundedSongClass() {
      const acceptedStages = ["videoFound", "converting", "converted"];
      const state = acceptedStages.includes(this.stage);

      return {
        "opacity-100": state,
        invisible: !state,
        "p-3": state,
      };
    },

    foundedSongStyle() {
      const acceptedStages = ["videoFound", "converting", "converted"];
      const state = acceptedStages.includes(this.stage);

      return {
        left: state ? "0px" : "-50px",
        height: !state ? "0px" : "auto",
      };
    },
  },

  async created() {
    // I use user id for backend specific music folders by the help of localstorage
    this.handleUserId();

    // initialize theme mode with localstorage
    await this.initThemeMode();

    // change theme mode
    await this.changeThemeMode("dark");

    // check both server and websocket connections
    const [statusServer, statusWebsocket] = await Promise.all([
      this.checkServerConnectivity(),
      this.checkWebsocketConnectivity(),
    ]);
    if (statusServer == false || statusWebsocket == false) {
      alert("Connection Problem!!!");
    }
  },
}).mount("#app");
