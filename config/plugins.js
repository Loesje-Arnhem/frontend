/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/vue-youtube',
  '~/plugins/axios',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vuex-persist', mode: 'client' },
  { src: '~/plugins/vue-announcer.js', mode: 'client' },
]
