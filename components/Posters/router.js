import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './views/Search.vue'
import Favorites from './views/Favorites.vue'
import Details from './views/Details.vue'

Vue.use(VueRouter)

export default new VueRouter({
  // Mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/favorieten',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/:slug',
      name: 'Poster',
      component: Details
    }
  ]
})
