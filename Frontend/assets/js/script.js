"use strict";

Vue.createApp({
  data() {
    return {
      displayFoundedSong: "asdf",
    };
  },
  methods: {
    addTask() {
      if (this.enteredTask.trim() === "") return;
      this.tasks.push(this.enteredTask);
      this.enteredTask = "";
    },

    removeTask(idx) {
      this.tasks.splice(idx, 1);
      console.log(this.tasks);
    },
  },
}).mount(".container");
