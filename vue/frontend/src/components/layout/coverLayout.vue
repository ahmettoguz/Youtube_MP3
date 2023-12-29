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
</template>

<script>
export default {
  data() {
    return {};
  },

  props: ["serviceConnection"],
};
</script>