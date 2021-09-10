<template>
  <div>
    <h1 style="color: white !important">Shopify x ImagIn</h1>
    <div
      id="cardHolder"
      class="row row-cols-1 row-cols-sm-3 row-cols-md-4 g-3 mt-3 mb-3"
    >
      <div class="col" v-for="item in 10" :key="item">
        <div class="card text-white bg-dark h-100 text-center">
          <img
            class="card-img-top"
            style="max-height: 50vh; object-fit: contain; margin-top: 30px"
            alt="..."
            src="https://firebasestorage.googleapis.com/v0/b/shopify-winter2022.appspot.com/o/1631246904790?alt=media&token=bcb2cafb-1114-4a8d-a2d2-2453ea5b6e01"
          />
          <div class="card-body">
            <h5 class="card-title">
              <b>Hello</b>
            </h5>
            <!-- <p class="card-text">{{ item.description }}</p> -->
          </div>
          <div class="card-footer">
            <small class="text-muted">Uploaded at xyz</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
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
