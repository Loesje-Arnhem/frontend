import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import tags from './modules/tags'
import favorites from './modules/favorites'

const vuexPersist = new VuexPersist({
  key: 'favorites',
  modules: ['favorites']
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tags,
    favorites
  },
  plugins: [vuexPersist.plugin]
})
