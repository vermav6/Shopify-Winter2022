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
      :items="items"
      :column-width="300"
      :padding="14"
    >
      <template #default="{ item }">
        <div class="card" v-on:click="openModal(item)">
          <img v-lazy="item.img" />
          <h1>{{ item.title }}</h1>
          <span>{{ item.description }}</span>
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
      items: [
        {
          title: "First",
          description: "The first item.",
          img: "https://firebasestorage.googleapis.com/v0/b/shopify-winter2022.appspot.com/o/1631246904790?alt=media&token=bcb2cafb-1114-4a8d-a2d2-2453ea5b6e01",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/1200/1250",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/900/1520",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/5100/2150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/450/1750",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/500/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/680/170",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/602/190",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/610/170",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/620/157",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/610/195",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
        {
          title: "First",
          description: "The first item.",
          img: "https://random.imagecdn.app/600/150",
        },
      ],
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