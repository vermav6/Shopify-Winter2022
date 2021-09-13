<template>
  <div>
    <form v-on:submit.prevent>
      <input
        type="file"
        id="myFile"
        accept="image/png, image/jpeg"
        @change="handleFileChange($event)"
        name="filename"
      />
      <br />
      <input v-model="fileName" placeholder="Enter File Name" />
      <br />
      <input @click="upload()" type="submit" />
      <br />
      <button @click="clear()" v-if="isFileSelected">Unselect Image</button>
    </form>
    <img :src="submittedFileLocalURL" style="height: 50vh" />
  </div>
</template>

<script>
import { storage } from "@/firebase_config.js";
import { uploadBytes, ref } from "firebase/storage";

export default {
  name: "Upload",
  data() {
    return {
      submittedFileLocalURL: null,
      uploadedFile: null,
      imageName: "",
    };
  },
  computed: {
    isFileSelected() {
      return this.submittedFileLocalURL && this.uploadedFile;
    },
  },
  methods: {
    upload() {
      const storageRef = ref(
        storage,
        `${this.$store.state.userData.uid}/${Date.now().toString()}`
      );
      if (this.uploadedFile && this.submittedFileLocalURL) {
        const metadata = {
          customMetadata: { imageName: "test", classification_status: 0 },
        };
        uploadBytes(storageRef, this.uploadedFile, metadata).then(
          (snapshot) => {
            alert("Uploaded a blob or file!");
            console.log(snapshot);
          }
        );
      } else {
        alert("Please select a file to upload");
      }
    },
    clear() {
      this.uploadedFile = null;
      this.submittedFileLocalURL = null;
    },
    handleFileChange(evt) {
      this.uploadedFile = evt.target.files[0];
      this.submittedFileLocalURL = URL.createObjectURL(evt.target.files[0]);
      console.log(evt.target.files[0]);
      this.fileName = evt.target.files[0].name;
      // evt.target.files contains Array-like FileList object
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
