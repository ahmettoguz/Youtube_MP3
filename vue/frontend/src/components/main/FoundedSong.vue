<template>
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
    <div class="col-12 col-lg-5 order-1 order-lg-2 d-flex align-items-center">
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
          <button class="btn btn-danger" type="button" @click="convertMusic">
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
          <button class="btn btn-danger" type="button" @click="downloadMusic">
            Download
          </button>
        </div>
        <!-- download button end -->
      </div>
    </div>
  </div>
  <!-- Founded song part end-->
</template>

<script>
export default {
  data() {
    return {};
  },

  props: [
    "songName",
    "songAuthor",
    "videoLenght",
    "videoBanner",
    "stage",
    "conversionProgress",
  ],

  emits: ["convert-music", "download-music"],

  methods: {
    convertMusic() {
      this.$emit("convert-music");
    },
    downloadMusic() {
      this.$emit("download-music");
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
  },
};
</script>

