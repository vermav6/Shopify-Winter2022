<template>
  <masonry-wall class="mason" :items="items" :column-width="300" :padding="14">
    <template #default="{ item }">
      <div class="card">
        <img v-lazy="item.img" />
        <h1>{{ item.title }}</h1>
        <span>{{ item.description }}</span>
      </div>
    </template>
  </masonry-wall>
</template>

<script>
export default {
  data() {
    return {
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
};
</script>
<style scoped>
.card {
  background-color: rgb(251, 247, 237) !important;
}
img {
  max-width: 100% !important;
  max-height: 500px !important;
  object-fit: contain;
}
.mason {
  padding: 40px !important;
}
</style>