/*
 ** Plugins to load before mounting the App
 */
export default [
  // '~/plugins/axios',
  '~/plugins/apollo',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vuex-persist', mode: 'client' },
  { src: '~/plugins/vue-announcer.js', mode: 'client' },
]
