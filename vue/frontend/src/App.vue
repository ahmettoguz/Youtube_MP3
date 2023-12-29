<!-- eslint-disable -->
<template>
  <div :class="bodyBgClass" class="ts">
    <!-- nav start -->
    <nav
      class="navbar navbar-expand-sm navbar-light bg-body-tertiary fixed-top p-1 p-sm-0"
    >
      <div class="container-fluid">
        <a class="navbar-brand m-md-0 ms-lg-5 p-0" href="./index.html">
          <img
            src="./assets/img/favicon.png"
            alt="YT"
            height="50"
            id="nav_Logo"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <!-- theme switch -->
          <ul class="navbar-nav ms-xl-5" @click="toggleThemeMode">
            <li class="nav-item">
              <div
                class="nav-link px-3 px-sm-3 px-md-2 px-lg-3 rounded-2 theme-icon"
              >
                <i class="fa-solid" :class="themeIconClass"></i>
              </div>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- nav end -->

    <div class="container py-5 bg-body-tertiary shadow-lg min-vh-100">
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

          <!-- Founded song part -->
          <div
            class="row mx-1 mt-4 bg-body shadow border border-dark rounded shadow-sm ts opacity-0 position-relative overflow-hidden justify-content-center"
            :class="foundedSongClass"
            :style="foundedSongStyle"
          >
            <div class="col-12 col-lg-7 mt-3 mt-lg-0 order-2 order-lg-1">
              <h5>Song Name</h5>
              <p class="ms-2 fs-5">{{ songName }}</p>

              <hr class="border-primary" />
              <h5 class="pt-2">Song Author</h5>
              <p class="ms-2 fs-5">{{ songAuthor }}</p>

              <hr class="border-primary" />
              <h5 class="pt-2">Song Length</h5>
              <p class="ms-2 fs-5">{{ videoLenght }}.</p>
            </div>
            <div
              class="col-12 col-lg-5 order-1 order-lg-2 d-flex align-items-center"
            >
              <img class="img-fluid rounded shadow" :src="videoBanner" alt="" />
            </div>
            <div class="col-12 order-3">
              <div class="row">
                <hr class="mt-2" />
                <!-- convert button -->
                <div
                  v-if="stage == 'videoFound'"
                  class="col12 d-flex justify-content-center"
                >
                  <button
                    class="btn btn-danger"
                    type="button"
                    @click="convertMusic"
                  >
                    Convert
                  </button>
                </div>
                <!-- convert button end -->

                <!-- progress bar -->
                <div
                  v-else-if="stage == 'converting'"
                  class="col12 d-flex justify-content-center mt-2"
                >
                  <div class="row w-100 px-0 mx-0">
                    <div class="col-2 px-0">
                      <div class="text-center">{{ conversionProgress }}%</div>
                    </div>

                    <div class="col-10 px-0">
                      <div class="w-100">
                        <div
                          class="progress"
                          role="progressbar"
                          :aria-valuenow="conversionProgress"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="height: 25px"
                        >
                          <div
                            class="progress-bar progress-bar-striped progress-bar-animated text-dark fs-5 bg-danger"
                            :style="{ width: conversionProgress + '%' }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- progress bar end -->

                <!-- download button -->
                <div
                  v-else-if="stage == 'converted'"
                  class="col12 d-flex justify-content-center mt-2"
                >
                  <button
                    class="btn btn-danger"
                    type="button"
                    @click="downloadMusic"
                  >
                    Download
                  </button>
                </div>
                <!-- download button end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <footer class="fixed-bottom" style="z-index: 9999">
      <a href="https://github.com/ahmettoguz" target="_blank"
        >Developed by Ahmet Oğuz Ergin</a
      >
    </footer>
    <!-- footer end -->

    <!-- layout  -->
    <div class="layout" :class="{ 'd-none': serviceConnection === true }">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-12 col-sm-12 col-md-8 col-lg-5 bg-dark p-3 rounded shadow"
          >
            <div class="row">
              <div class="col-12">
                <h1
                  class="text-center text-white-50"
                  style="font-family: 'Montserrat', sans-serif"
                >
                  Connecting Server
                </h1>
              </div>
              <div class="col-12 mt-3">
                <!-- loading gif -->
                <div
                  class="d-flex justify-content-center align-items-center h-100"
                >
                  <div class="opacity-0"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                </div>
                <!-- loading gif end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- layout end -->
  </div>
</template>

<script>
/* eslint-disable */
"use strict";
import $ from "jquery";

import commonService from "./service/commonService.js";
import clientWebsocketService from "./service/clientWebsocketService.js";

const serverUrl = "http://localhost";
const apiUrl = `${serverUrl}/api`;

// import secondComponent from "./components/SecondComponent.vue";

export default {
  // components: {
  //   "second-component": secondComponent,
  // },

  data() {
    return {
      serviceConnection: "initial",
      videoUrlInput: "https://youtu.be/ZtelRow0qNI",
      videoUrlInputValidation: "neutral",
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
      // remove previous information labels for input field
      this.videoUrlInputValidation = "neutral";

      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: `${apiUrl}/getUrlInfo`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            url: this.videoUrlInput,
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

    errorCallback() {
      this.serviceConnection = false;
    },

    async checkWebsocketConnectivity() {
      // connect to websocket
      await clientWebsocketService.connectWebsocket(this.errorCallback);
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

    themeIconClass() {
      const state = this.themeMode == "light" ? true : false;

      return {
        "fa-brightness": state,
        "fa-moon": !state,
      };
    },

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

<style >
.ts {
  transition: 200ms ease;
}

/* navigation bar */
.navbar {
  /* zindex is used for layout */
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.nav-link ~ span {
  display: block;
  position: relative;

  width: 0%;
  height: 3px;
  border-radius: 5px;
  background-image: linear-gradient(130deg, #ff7a17, #af002d 41%, #319197 76%);
  transition: 300ms ease;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-link:hover ~ span {
  width: 100%;
}

.theme-icon {
  cursor: pointer;
}

.theme-icon i {
  font-size: 1.7rem;
  transition: 300ms;
}

.theme-icon:hover i {
  transform: rotate(-30deg);
}
/* navigation bar end */

/* footer */
footer {
  opacity: 1;
  font-style: italic;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(90deg, gray -150%, black 50%, gray 250%);
  text-align: center;
}

footer a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}
/* footer end */

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

/* loading gif */
.wave {
  width: 6px;
  height: 100px;
  background: linear-gradient(45deg, white, skyblue, white);
  margin: 10px;
  animation: wave 900ms linear infinite;
  transform: scale(0);
  border-radius: 4px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
/* loading gif end */

/* layout  */
.layout {
  /* zindex is used for layout */
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.926);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* layout end */
</style>