"use strict";
import commonService from "./commonService.js";
import clientWebsocketService from "./clientWebsocketService.js";

const serverUrl = "http://localhost";
const apiUrl = `${serverUrl}/api`;

Vue.createApp({
  data() {
    return {
      userLocalId: null,
      videoBanner: "",
      videoSongName: "",
      videoLenght: null,
      stage: "initial",
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

        this.videoBanner = data.imgUrl;
        this.videoSongName = data.songName;
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

      const videoUrlInput = $("#videoUrlInput").val();

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/convertUrl`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            url: videoUrlInput,
          }),
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

      this.stage = "converting";
    },

    async handleUserId() {
      // check if it is already setted
      this.userLocalId = localStorage.getItem("ytmp3Id");

      // if not set new one
      if (this.userLocalId == null)
        localStorage.setItem("ytmp3Id", commonService.generateRandomWord());
    },

    websocketMessageReceived(incomingMessage) {
      console.log("Received websocket message:", incomingMessage);
      // clientWebsocketService.sendMessage({ text: "Hello, server!" });
    },

    websocketError(err) {
      console.log("Websocket Error:", err);
    },

    async checkWebsocketConnectivity() {
      // connect to websocket
      await clientWebsocketService.connectWebsocket();
      clientWebsocketService.receiveMessage(this.websocketMessageReceived);
      clientWebsocketService.handleWebSocketError(this.websocketError);

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
  },

  computed: {
    foundedSongClass() {
      return {
        "opacity-100":
          this.stage === "videoFound" || this.stage === "converting",
        invisible: this.stage !== "videoFound" && this.stage !== "converting",
        "p-3": this.stage === "videoFound" || this.stage === "converting",
      };
    },

    foundedSongStyle() {
      return {
        left:
          this.stage === "videoFound" || this.stage === "converting"
            ? "0px"
            : "-50px",
        height:
          this.stage != "videoFound" && this.stage !== "converting"
            ? "0px"
            : "auto",
      };
    },
  },

  async created() {
    // I use user id for backend specific music folders by the help of localstorage
    this.handleUserId();

    // check both server and websocket connections
    const [statusServer, statusWebsocket] = await Promise.all([
      this.checkServerConnectivity(),
      this.checkWebsocketConnectivity(),
    ]);
    if (statusServer == false || statusWebsocket == false) {
      alert("Connection Problem!!!");
    }
  },
}).mount(".container");
