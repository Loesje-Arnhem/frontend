/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/apollo',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vue-announcer', mode: 'client' },
  { src: '~/plugins/page-transitions', mode: 'client' },
  { src: '~/plugins/pwa', mode: 'client' },
]
