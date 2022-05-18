/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/apollo',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vue-announcer.js', mode: 'client' },
  { src: '~/plugins/page-transitions.js', mode: 'client' },
]
