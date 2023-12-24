"use strict";
import commonService from "./commonService.js";

const serverUrl = "http://localhost";
const apiUrl = `${serverUrl}/api`;

async function checkServerConnectivity() {
  const response = await new Promise((resolve, reject) => {
    $.ajax({
      url: `${serverUrl}/healthCheck`,
      type: "GET",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function (data) {
        resolve({ status: true, data: data });
      },
      error: function (error) {
        resolve({ status: false });
      },
    });
  });

  if (!response.status) {
    alert("Cannot connected to server!");
    return;
  }

  console.log("Backend server connection is successful.");
}

Vue.createApp({
  data() {
    return {
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
      const videoUrlInput = $("#videoUrlInput").val();

      // get user id to use in header part
      const userId = localStorage.getItem("ytmp3Id");

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/convertUrl`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            url: videoUrlInput,
          }),
          headers: {
            "User-Id": userId,
          },
          success: function (data) {
            resolve({ status: true, data: data });
          },
          error: function (error) {
            resolve({ status: false });
          },
        });
      });

      if (response.status == true) {
        this.stage = "converting";
        console.log(response);
      }
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
    // to use folder structure in backend set dummy user id to localstorage
    const userId = commonService.generateRandomWord();

    // check if it is already setted
    const id = localStorage.getItem("ytmp3Id");

    // set new one if there is no id
    if (id == null) localStorage.setItem("ytmp3Id", userId);

    // check backend server with get request
    checkServerConnectivity();
  },
}).mount(".container");
