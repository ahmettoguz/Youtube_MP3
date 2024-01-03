<!-- eslint-disable -->
<template>
  <div :class="bodyBgClass" class="ts">
    <!-- navigation component -->
    <navigation-bar
      :theme-mode="themeMode"
      @toggle-theme-mode="toggleThemeMode"
    ></navigation-bar>

    <!-- main parts -->
    <div class="container py-5 bg-body-tertiary shadow-lg min-vh-100">
      <!-- header part -->
      <div class="d-flex justify-content-center align-items-center">
        <img src="./assets/img/favicon.png" height="50" class="pe-3" />
        <h1 class="mb-4 pt-5 pt-sm-3 text-center d-inline">
          Youtube Downloader
        </h1>
      </div>

      <div class="row justify-content-center h-100">
        <div class="col-sm-10 col-md-8 col-lg-7">
          <form id="form">
            <div class="row justify-content-center">
              <div class="col-7 col-sm-8 col-lg-6">
                <input
                  type="search"
                  class="form-control"
                  :class="videoUrlInputValidationClass"
                  v-model="videoUrlInput"
                  placeholder="Video Url"
                />
                <div class="invalid-feedback">Video url is not valid!</div>
                <div class="valid-feedback">Video url is valid.</div>
              </div>

              <div
                class="col-sm-4 col-lg-2 ts"
                :class="{
                  'col-3': stage != 'searchingVideo',
                  'col-5': stage == 'searchingVideo',
                  'col-md-3': stage != 'searchingVideo',
                  'col-lg-3': stage == 'searchingVideo',
                }"
              >
                <button
                  class="btn btn-danger"
                  type="submit"
                  @click.prevent="findMusic"
                  :disabled="
                    stage == 'searchingVideo' || serviceConnection != true
                  "
                >
                  {{ stage != "searchingVideo" ? "Search" : "Searching" }}

                  <span
                    class="spinner-border spinner-border-sm"
                    :class="{ 'd-none': stage != 'searchingVideo' }"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
          </form>

          <!-- founded song part -->
          <founded-song
            :song-name="songName"
            :song-author="songAuthor"
            :video-lenght="videoLenght"
            :video-banner="videoBanner"
            :stage="stage"
            :conversion-progress="conversionProgress"
            @convert-music="convertMusic"
            @download-music="downloadMusic"
          ></founded-song>
        </div>
      </div>
    </div>

    <!-- footer component -->
    <footer-layout></footer-layout>

    <!-- cover layout full page with loading gif -->
    <cover-layout :service-connection="serviceConnection"></cover-layout>
  </div>
</template>

<script>
/* eslint-disable */
"use strict";
import $ from "jquery";
import axios from "axios";

import commonService from "./service/commonService.js";
import clientWebsocketService from "./service/clientWebsocketService.js";

const hostName = process.env.VUE_APP_SERVER_HOST || "backend";
const serverPort = process.env.VUE_APP_SERVER_PORT || "3000";
const serverUrl = `http://${hostName}:${serverPort}`;
const apiUrl = `${serverUrl}/api`;

import navigationBar from "./components/layout/NaivgationBar.vue";
import footerLayout from "./components/layout/FooterLayout.vue";
import CoverLayout from "./components/layout/CoverLayout.vue";
import foundedSong from "./components/main/FoundedSong.vue";

export default {
  components: { navigationBar, footerLayout, CoverLayout, foundedSong },

  data() {
    return {
      serviceConnection: "initial",
      videoUrlInput: "https://youtu.be/ZtelRow0qNI",
      videoUrlInputValidation: "neutral",
      userLocalId: null,
      videoBanner: null,
      convertedSongId: null,
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
      // remove previous information labels for input field
      this.videoUrlInputValidation = "neutral";

      const response = await new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `${apiUrl}/getUrlInfo`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            url: this.videoUrlInput,
          }),

          onUploadProgress: () => {
            this.stage = "searchingVideo";
          },
        })
          .then((response) => {
            resolve({ status: true, data: response.data });
          })
          .catch((error) => {
            resolve({ status: false });
          });
      });

      if (response.status) {
        const data = response.data.data;

        // change stage to display found music part
        this.stage = "videoFound";

        // get informations
        this.videoBanner = data.imgUrl;
        this.songName = commonService.capitalizeFirstLetter(data.songName);
        this.songAuthor = commonService.capitalizeFirstLetter(data.songAuthor);
        this.videoLenght = data.songLength;

        // display label for input field
        this.videoUrlInputValidation = "valid";
      } else {
        // display label for input field
        this.videoUrlInputValidation = "invalid";

        // change stage
        setTimeout(() => {
          this.stage = "initial";
        }, 500);
      }
    },

    async convertMusic() {
      // check websocket connection
      if (!clientWebsocketService.getConnectionStatus()) {
        return false;
      }

      // change stage
      this.stage = "converting";
      this.conversionProgress = 0;

      const response = await new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `${apiUrl}/convertUrl`,
          headers: {
            "Content-Type": "application/json",
            "User-Id": this.userLocalId,
          },
          data: JSON.stringify({
            videoBanner: this.videoBanner,
          }),

          onUploadProgress: () => {},
        })
          .then((response) => {
            resolve({ status: true, data: response.data });
          })
          .catch((error) => {
            resolve({ status: false });
          });
      });

      if (response.status == false) {
        alert("Convertion cannot performed!");
        return;
      }

      // save converted song id
      this.convertedSongId = response.data.data.convertedSongId;
    },

    async handleUserId() {
      // check if it is already setted
      this.userLocalId = localStorage.getItem("ytmp3Id");

      // if not set new one
      if (this.userLocalId == null || this.userLocalId == "null")
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

    errorCallback() {
      this.serviceConnection = false;
    },

    async checkWebsocketConnectivity() {
      // connect to websocket
      await clientWebsocketService.connectWebsocket(this.errorCallback);
      clientWebsocketService.receiveMessage(this.websocketMessageReceived);

      // send request to endpoint to receive healthcheck
      await new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${serverUrl}/health-check/websocket`,
          headers: {
            "Content-Type": "application/json",
            "User-Id": this.userLocalId,
          },
          data: JSON.stringify({}),
        })
          .then((response) => {
            resolve({ status: true, data: response.data });
          })
          .catch((error) => {
            resolve({ status: false });
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
        axios({
          method: "get",
          url: `${serverUrl}/health-check/backend`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({}),
        })
          .then((response) => {
            resolve({ status: true, data: response.data });
          })
          .catch((error) => {
            resolve({ status: false });
          });
      });

      if (!response.status) {
        return false;
      }

      console.log("Backend server connection is successful.");
      return true;
    },

    async downloadMusic() {
      const response = await new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `${apiUrl}/download`,
          headers: {
            "Content-Type": "application/json",
            "User-Id": this.userLocalId,
          },
          data: JSON.stringify({
            convertedSongId: this.convertedSongId,
          }),
          responseType: "blob",

          onUploadProgress: () => {},
        })
          .then((response) => {
            resolve({ status: true, data: response.data });
          })
          .catch((error) => {
            resolve({ status: false });
          });
      });

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

    async toggleThemeMode() {
      this.themeMode = this.themeMode == "light" ? "dark" : "light";
      await this.changeThemeMode();
    },

    async initThemeMode() {
      this.themeMode = localStorage.getItem("yt-theme-mode");
      if (this.themeMode == undefined || this.themeMode == null) {
        this.themeMode = "light";
        localStorage.setItem("yt-theme-mode", this.themeMode);
      }

      this.changeThemeMode(this.themeMode);
    },

    async changeThemeMode() {
      // set to localstorage
      localStorage.setItem("yt-theme-mode", this.themeMode);

      // change overall theme
      $("body").attr("data-bs-theme", this.themeMode);
    },
  },

  computed: {
    bodyBgClass() {
      const state = this.themeMode == "light" ? true : false;
      return {
        "light-body-bg": state,
        "dark-body-bg": !state,
      };
    },

    videoUrlInputValidationClass() {
      const isValid = this.videoUrlInputValidation == "valid" ? true : false;
      const isInvalid =
        this.videoUrlInputValidation == "invalid" ? true : false;

      return {
        "is-invalid": isInvalid,
        "is-valid": isValid,
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
      this.serviceConnection = false;
    } else {
      setTimeout(() => {
        this.serviceConnection = true;
      }, 1000);
    }
  },
};
</script>

<style>
.ts {
  transition: 200ms ease;
}
</style>

<style scoped>
/* body */
.dark-body-bg {
  background-size: 22%;
  background-position: 9% -40%;
  /* background-image: url(../img/bg-memphis-dark.jpg); */
  background-image: url(./assets/img/bg-memphis-dark.jpg);
}

.light-body-bg {
  background-size: 30%;
  background-image: url(./assets/img/bg-memphis-light.jpg);
}
/* body end */
</style>