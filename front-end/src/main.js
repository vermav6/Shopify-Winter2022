import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/plugins/router"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
app.use(router)
app.mount('#app')
