<template>
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
              <load-gif></load-gif>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- layout end -->
</template>

<script>
import LoadGif from "../load/LoadGif.vue";

export default {
  components: { LoadGif },
  data() {
    return {};
  },

  props: ["serviceConnection"],
};
</script>