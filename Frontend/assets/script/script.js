"use strict";

Vue.createApp({
  data() {
    return {
      // videoBanner:
      //   "https://i.ytimg.com/vi_webp/9FFufON_KUA/maxresdefault.webp?v=618c7fdd",
      videoBanner: "",
      videoSongName: "",
      videoLenght: null,
      stage: "search",
      serverUrl: "http://localhost",
      // serverUrl : "http://159.203.81.11"
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
          url: `${this.serverUrl}/getUrlInfo`,
          type: "POST",
          data: {
            url: videoUrlInput,
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
      alert(1);
    },
  },
}).mount(".container");
