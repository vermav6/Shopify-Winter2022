<template>
  <div style="justify-content: center">
    <form>
      <input
        class="form-control inp1"
        type="file"
        id="myFile"
        accept="image/png, image/jpeg"
        @change="handleFileChange($event)"
        name="filename"
      />
      <br />
      <input
        v-model="imageName"
        class="form-control inp2"
        placeholder="Enter Image Name"
      />
      <br />
      <button @click="upload()" class="btn btn-info">Upload</button>
      &nbsp;&nbsp;
      <button @click="clear()" class="btn btn-danger" v-if="isFileSelected">
        Unselect Image
      </button>
    </form>
    <img :src="submittedFileLocalURL" style="height: 50vh" />
  </div>
</template>

<script>
import { storage } from "@/firebase_config.js";
import { uploadBytes, ref } from "firebase/storage";
import { useToast } from "vue-toastification";
const toast = useToast();

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
    validateForm() {
      if (this.imageName == "") {
        alert("Enter the image name before uploading");
        return false;
      }
      return true;
    },
    upload() {
      if (!this.validateForm()) {
        return;
      }
      const storageRef = ref(
        storage,
        `${this.$store.state.userData.uid}/${Date.now().toString()}`
      );
      if (this.uploadedFile && this.submittedFileLocalURL) {
        const metadata = {
          customMetadata: {
            imageName: this.imageName,
            classification_status: 0,
          },
        };
        uploadBytes(storageRef, this.uploadedFile, metadata).then(() => {
          this.$router.push("/my");
          toast.update(
            "submitted",
            {
              content: "Image uploaded",
              options: { type: "info", timeout: 2000 },
            },
            true
          );
        });
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

.inp1 {
  margin: auto;
  margin-top: 50px;
  max-width: 50vw;
}
.inp2 {
  margin: auto;
  max-width: 30vw;
}

.inp3 {
  margin: auto;
}
</style>
