import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import Show from '../views/Show.vue'
import Favourites from '../views/Favourites.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/tv/:id',
    name: 'TV',
    component: Show
  },
  {
    path: '/favourites/',
    name: 'Favourites',
    component: Favourites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router