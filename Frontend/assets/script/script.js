"use strict";

Vue.createApp({
  data() {
    return {
      displayFoundedSong: false,
      serverUrl: "http://localhost",
      // serverUrl : "http://159.203.81.11"
    };
  },
  methods: {
    async findMusic(e) {
      let videoUrl = $("#videoUrl").val();
      videoUrl: "https://youtu.be/shr16M_1qu8?list=LL";

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${this.serverUrl}/getUrlInfo`,
          type: "POST",
          data: {
            url: videoUrl,
          },
          success: function (data) {
            console.log("success");
            resolve(data);
          },
          error: function (error) {
            console.log("fail");
            reject(error);
          },
        });
      });

      console.log("Reposnse: ", response);

      if (response) this.displayFoundedSong = true;
    },
  },
}).mount(".container");
