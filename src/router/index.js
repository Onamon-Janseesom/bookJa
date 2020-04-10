import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Airway from '../views/Airways.vue'
import Hotel from '../views/Hotel.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/airways',
    name: 'Airways',
    component: Airway
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
