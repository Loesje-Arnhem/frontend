/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/vue-youtube',
  '~/plugins/axios',
  '~/plugins/vuelidate',
  '~/plugins/apollo',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vuex-persist', mode: 'client' },
  { src: '~/plugins/vue-infinite-loading', mode: 'client' },
]
