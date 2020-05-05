/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/vue-youtube',
  '~/plugins/axios',
  '~/plugins/vuelidate',
  { src: '~/plugins/houdini', ssr: false },
  { src: '~/plugins/vuex-persist', ssr: false },
]
