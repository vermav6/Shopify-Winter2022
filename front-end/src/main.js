import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/plugins/router"
import MasonryWall from '@yeger/vue-masonry-wall'
import VueLazyLoad from 'vue3-lazyload'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
app.use(router)
app.use(MasonryWall)
app.use(VueLazyLoad, {
    preLoad: 1.3,
    error: 'https://www.globalsign.com/application/files/9516/0389/3750/What_Is_an_SSL_Common_Name_Mismatch_Error_-_Blog_Image.jpg',
    loading: 'https://i.giphy.com/media/N256GFy1u6M6Y/giphy.webp',
    attempt: 2
  })
app.mount('#app')
