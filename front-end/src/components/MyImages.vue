<template>
  <div
    v-show="this.$store.state.loggedIn || this.$store.state.randomGalleryState"
  >
    <div class="modal" v-if="modalURL != null" v-on:click="modalURL = null">
      <div class="modal-content">
        <span class="close">&times;</span>
        <img class="modalImg" v-lazy="modalURL" />
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mason"
      v-if="Object.keys(this.$store.state.myImages).length != 0"
    >
      <div
        class="col"
        v-for="item in Object.keys(this.$store.state.myImages)"
        :key="item"
      >
        <div class="card h-100">
          <button
            class="deleteButton btn btn-danger"
            v-on:click="deleteImg(item)"
          >
            Delete
          </button>
          <img
            v-lazy="getImgDetails(item).img"
            class="card-img-top cardImg"
            alt="..."
            v-on:click="openModal(getImgDetails(item))"
          />
          <div class="card-body">
            <h5 class="card-title">{{ getImgDetails(item).title }}</h5>
            <span>
              <span
                class="badge bg-success"
                style="margin-right: 5px"
                v-for="tag in getImgDetails(item).tags"
                v-bind:key="tag"
              >
                {{ tag }}
              </span>
            </span>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ getImgDetails(item).uploaded }}</small>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <br />Please upload an image to see it here<br />
      <br />
      <button class="btn btn-warning" @click="$router.push('/upload')">
        Go to upload
      </button>
    </div>
  </div>
</template>

<script>
import { storage, getMyImagesFromStorage } from "@/firebase_config.js";
import { ref, deleteObject } from "firebase/storage";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  data() {
    return {
      modalURL: null,
      componentKey: 0,
      updateInterval: null,
    };
  },
  unmounted() {
    clearInterval(this.updateInterval);
  },
  created() {
    getMyImagesFromStorage();
    this.updateInterval = setInterval(function () {
      // method to be executed;
      getMyImagesFromStorage();
    }, 10000);
  },
  methods: {
    deleteImg(item) {
      const deleteRef = ref(storage, item);
      deleteObject(deleteRef)
        .then(() => {
          toast.update(
            "imgDeletion",
            {
              content: `Image is now deleted`,
              options: { type: "error", timeout: 2000 },
            },
            true
          );
          delete this.$store.state.myImages[item];
          delete this.$store.state.gallery[item];
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getImgDetails(item) {
      return this.$store.state.gallery[item];
    },
    isMyImage(item) {
      return this.$store.state.myImages[item];
    },
    generateSampleImages() {
      if (!this.$store.state.loggedIn) {
        this.$store.state.gallery = {};
        this.$store.state.randomGalleryState = true;
        for (let index = 0; index < 10; index++) {
          let dimension = "1200/1250";
          if (index % 2) {
            dimension = `1200/${this.getRndInteger(300, 1000)}`;
          }
          const rtag = [];
          for (let index = 0; index < 5; index++) {
            rtag.push(`Tag ${index}`);
          }
          this.$store.state.gallery[index] = {};
          this.$store.state.gallery[index]["title"] = `Image: ${index}`;
          this.$store.state.gallery[index]["tags"] = rtag;
          this.$store.state.gallery[index]["uploaded"] = new Date();
          this.$store.state.gallery[index][
            "img"
          ] = `https://random.imagecdn.app/${dimension}?${index}`;
        }
      }
    },
    openModal(item) {
      this.modalURL = item.img;
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>
<style scoped>
.deleteButton {
  position: absolute;
  top: 3px;
  right: 5px;
  border-radius: 20px;
}

.card {
  background-color: rgb(251, 247, 237) !important;
  border-radius: 10px;
  transition: background-color 1s, box-shadow 0.25s, transform 0.25s;
  color: rgb(0, 76, 63);
}

.card:hover {
  background-color: black !important;
  cursor: pointer;
  /* border-radius: 15px; */
  box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
  transform: translate3d(0px, -1px, 0px);
}
.cardImg {
  /* width: 100% !important; */
  height: 400px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: contain;
}

.modalImg {
  max-height: 90%;
  object-fit: contain;
}
.mason {
  margin: 30px !important;
  padding-bottom: 40px !important;
}

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%; /* Full width */
  height: 100vh; /* Full height */
  overflow: none !important;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  cursor: pointer;
}

/* Modal Content/Box */
.modal-content {
  position: absolute; /* Stay in place */
  background-color: #fefefe;
  top: 2vh;
  padding: 20px;
  border: 1px solid #888;
  left: 10%;
  height: 95%;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>