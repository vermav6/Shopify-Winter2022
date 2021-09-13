import Home from "@/components/Home.vue"
import Upload from "@/components/Upload.vue"
import {createRouter, createWebHistory } from "vue-router";
// import {userDetails} from "@/firebase_config.js";
import { store } from "../vuex";
import { useToast } from "vue-toastification";
import { auth } from "@/firebase_config.js";
const toast = useToast();

const routes = [
  { path: '/', component: Home },
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
    console.log(auth.currentUser)
      if(!store.state.loggedIn){
        setTimeout(function() {
          if(auth.currentUser){
            next();
          }
          else{
            toast.error('You must be logged in to see this page');
            next({
                path: '/',
            });
          }
        }, 500);  
      }
      else {
          next();
      }
  } else {
      next();
  }
});

