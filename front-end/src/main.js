import { createApp } from 'vue'
import App from './App.vue'
import { router } from "@/plugins/router"
import { store } from './plugins/vuex'
import MasonryWall from '@yeger/vue-masonry-wall'
import VueLazyLoad from 'vue3-lazyload'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
const toastOptions = {
  position: "top-center",
  timeout: 3500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  maxToasts: 3,
  icon: true,
  rtl: false
}
app.use(router)
app.use(MasonryWall)
app.use(Toast, toastOptions);
app.use(store)
app.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'https://www.globalsign.com/application/files/9516/0389/3750/What_Is_an_SSL_Common_Name_Mismatch_Error_-_Blog_Image.jpg',
  loading: 'https://i.giphy.com/media/N256GFy1u6M6Y/giphy.webp',
  attempt: 2
})
app.mount('#app')
