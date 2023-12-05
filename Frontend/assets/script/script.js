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
    findMusic(e) {
      e.preventDefault();

      if (1) this.displayFoundedSong = true;
    },
  },
}).mount(".container");
