<template>
  <div>
    <div
      id="myModal"
      class="modal"
      v-if="modalURL != null"
      v-on:click="modalURL = null"
    >
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <img v-lazy="modalURL" />
      </div>
    </div>
    <masonry-wall
      class="mason"
      :items="this.$store.state.gallery"
      :column-width="300"
      :padding="14"
      v-if="this.$store.state.gallery.length > 0"
    >
      <template #default="{ item }">
        <div class="card" v-on:click="openModal(item)">
          <img v-lazy="item.img" />
          <span style="font-size: 20px">{{ item.title }}</span>
          <br />
          <span>
            <span
              class="badge bg-success"
              style="margin-right: 5px"
              v-for="tag in item.tags"
              v-bind:key="tag"
            >
              {{ tag }}
            </span>
          </span>
          <hr style="padding: none !important; margin: none !important" />
          <span
            style="
              padding: none !important;
              margin-top: none !important;
              padding-bottom: 10px !important;
            "
            >{{ item.uploaded }}</span
          >
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalURL: null,
    };
  },
  methods: {
    openModal(item) {
      this.modalURL = item.img;
    },
  },
};
</script>
<style scoped>
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
img {
  max-width: 100% !important;
  max-height: 500px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: contain;
}
.mason {
  padding: 40px !important;
}

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
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