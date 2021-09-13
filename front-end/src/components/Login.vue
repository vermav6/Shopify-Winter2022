<template>
  <div>
    <form @submit.prevent="login">
      <br />
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email address..."
        v-model="email"
      /><br /><br />
      <input type="password" placeholder="password..." v-model="password" />
      <br /><br />
      <button class="btn btn-primary" type="submit" v-on:click="signIn">
        Login
      </button>
      &nbsp;
      <button class="btn btn-info" type="submit" v-on:click="register">
        Register</button
      ><br /><br />
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebase_config.js";
import { useToast } from "vue-toastification";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const toast = useToast();
export default {
  name: "Navbar",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    validateForm() {
      if (!this.email.includes("@") || !this.email.includes(".")) {
        toast.update(
          "inavlidEmail",
          {
            content:
              "The email you have entered is not valid. Please try again",
            options: { type: "error", timeout: 3500 },
          },
          true
        );
        return false;
      }
      if (this.password.length <= 6) {
        toast.update(
          "inavlidPassword",
          {
            content:
              "The password you have entered is too short. Please try again",
            options: { type: "error", timeout: 3500 },
          },
          true
        );
        return false;
      }
      return true;
    },
    register() {
      if (!this.validateForm()) {
        return;
      }
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    signIn() {
      if (!this.validateForm()) {
        return;
      }
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(errorCode);
          //   if (errorCode == "auth/invalid-email") {
          if (errorCode == "auth/invalid-email") {
            toast.update(
              "inavlidEmail",
              {
                content:
                  "The email you have entered is not valid. Please try again",
                options: { type: "error", timeout: 3500 },
              },
              true
            );
          } else if (errorCode == "auth/user-not-found") {
            toast.update(
              "notRegistered",
              {
                content:
                  "This email is not registered. Please register first before logging in.",
                options: { type: "error", timeout: 3500 },
              },
              true
            );
          } else if (errorCode == "auth/wrong-password") {
            toast.update(
              "incorrectPassword",
              {
                content:
                  "The password you have entered is incorrect. Please try again",
                options: { type: "error", timeout: 3500 },
              },
              true
            );
            this.password = "";
          }
          return;
        });
    },
  },
};
</script>
