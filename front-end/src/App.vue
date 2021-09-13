<template>
  <div class="green fullheight cutwidth">
    <Navbar class="navbar-top" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.navbar-top {
  position: relative;
  top: 0px;
}

.beige {
  background-color: rgb(251, 247, 237) !important;
}

.green {
  background-color: rgb(0, 76, 63) !important;
}

.fullheight {
  min-height: 100vh !important;
}

.cutwidth {
  align-items: center !important;
  justify-content: center !important;
  margin: auto;
  max-width: 1600px !important;
}
</style>
