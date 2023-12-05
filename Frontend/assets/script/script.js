"use strict";

Vue.createApp({
  data() {
    return {
      videoSongName: "",
      videoSingerName: "",
      videoLenght: 0,
      displayFoundedSong: false,
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
        this.displayFoundedSong = true;

        console.log(data.songName);
        this.videoSongName = data.songName;
        this.videoSingerName = data.singerName;
        this.videoLenght = data.songLength;

        // display label for input field
        $("#videoUrlInput").addClass("is-valid");
      } else {
        // display label for input field
        $("#videoUrlInput").addClass("is-invalid");
      }
    },
  },
}).mount(".container");
