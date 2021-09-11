import Home from "@/components/Home.vue"
import Upload from "@/components/Upload.vue"
import Gallery from "@/components/Gallery.vue"
import {createRouter, createWebHistory } from "vue-router";
// import {userDetails} from "@/firebase_config.js";
import { store } from "../vuex";
import { useToast } from "vue-toastification";
const toast = useToast();

const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery,  meta: {
    authRequired: true,
},},
{ path: '/upload', component: Upload,  meta: {
  authRequired: true,
},},
{ path: '/:catchAll(.*)', component: Home },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
      if (store.state.loggedIn) {
          next();
      } else {
          toast.error('You must be logged in to see this page');
          next({
              path: '/',
          });
      }
  } else {
      next();
  }
});

