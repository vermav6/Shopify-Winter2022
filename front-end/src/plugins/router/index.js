import Home from "@/components/Home.vue"
import Upload from "@/components/Upload.vue"
import {createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: Upload },
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})

