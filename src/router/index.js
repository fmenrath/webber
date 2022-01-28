import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import Show from '../views/Show.vue'
import Favourites from '../views/Favourites.vue'
import About from '../views/About.vue'
import Search from '../views/Search.vue'
import Person from '../views/Person.vue'



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
  },
  {
    path: '/about/',
    name: 'About',
    component: About
  },
  {
    path: '/search/',
    name: 'Search',
    component: Search
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: Person
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
