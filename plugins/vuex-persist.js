import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'favorites',
      modules: ['favorites'],
    }).plugin(store)
  })
}
