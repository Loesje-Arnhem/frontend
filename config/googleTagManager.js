export default {
  id: process.env.NUXT_ENV_GOOGLE_TAG_MANAGER_KEY,
  respectDoNotTrack: true,
  scriptDefer: true,
  dev: process.env.NUXT_ENV_GOOGLE_TAG_MANAGER_KEY !== null,
}
