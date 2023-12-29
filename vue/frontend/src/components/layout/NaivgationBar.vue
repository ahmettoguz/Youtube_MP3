<template>
  <!-- nav start -->
  <nav
    class="navbar navbar-expand-sm navbar-light bg-body-tertiary fixed-top p-1 p-sm-0"
  >
    <div class="container-fluid">
      <a class="navbar-brand m-md-0 ms-lg-5 p-0" href="./index.html">
        <img
          src="../../assets/img/favicon.png"
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
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
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
</template>

<script>
export default {
  data() {
    return {};
  },

  props: ["themeMode"],

  emits: ["toggle-theme-mode"],

  methods: {
    toggleThemeMode() {
      this.$emit("toggle-theme-mode");
    },
  },

  computed: {
    themeIconClass() {
      const state = this.themeMode == "light" ? true : false;

      return {
        "fa-brightness": state,
        "fa-moon": !state,
      };
    },
  },
};
</script>

<style scoped>
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
</style>