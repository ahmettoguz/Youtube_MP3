"use strict";
import commonService from "./commonService.js";

const serverUrl = "http://localhost";
const apiUrl = `${serverUrl}/api`;

Vue.createApp({
  data() {
    return {
      videoBanner: "",
      videoSongName: "",
      videoLenght: null,
      stage: "search",
    };
  },
  methods: {
    async findMusic(e) {
      let videoUrlInput = $("#videoUrlInput").val();
      videoUrlInput: "https://youtu.be/shr16M_1qu8?list=LL";

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
      console.log("converting");
      const videoUrlInput = "https://youtu.be/pCZfk1qEq0c?list=LL";

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

      console.log(response);
    },
  },
  async created() {
    // to use folder structure in backend set dummy user id to localstorage
    const userId = commonService.generateRandomWord();

    // check if it is already setted
    const id = localStorage.getItem("ytmp3Id");

    // set new one if there is no id
    if (id == null) localStorage.setItem("ytmp3Id", userId);
  },
}).mount(".container");
