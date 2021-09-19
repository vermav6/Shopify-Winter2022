<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light beige">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
        style="font-size: 30px; font-weight: 550; font-style: italic"
        >imagIn</a
      >;
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              v-if="this.$store.state.loggedIn"
              >Gallery</router-link
            >
            <router-link class="nav-link" to="/" v-else>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/upload"
              v-if="this.$store.state.loggedIn"
              >Upload</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/my"
              v-if="this.$store.state.loggedIn"
              >My images</router-link
            >
          </li>
        </ul>
        <form class="d-flex" v-if="this.$store.state.loggedIn">
          <a style="color: black; margin-top: 3%; margin-right: 10px">
            {{ this.$store.state.userData.email }}
          </a>
          <button
            class="btn btn-outline-success"
            type="submit"
            v-on:click="signOut()"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/firebase_config.js";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    signOut() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$store.state.loggedIn = false;
          this.$store.state.userData = {};
          this.$router.push("/");
        })
        .catch(() => {
          this.$store.state.loggedIn = false;
          this.$store.state.userData = {};
          this.$router.push("/");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  min-height: 70px !important;
}

.beige {
  background-color: rgb(251, 247, 237) !important;
}

.nav-link {
  font-size: 20px;
  font-weight: bold;
}

.router-link-active {
  color: rgb(0, 76, 63) !important;
}
</style>
