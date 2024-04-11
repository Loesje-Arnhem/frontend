import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('nitro:build:before', async (nitro) => {
      console.log('hook1')
      if (process.env.NODE_ENV === 'production' && process.env.NUXT_SSR === 'true') {
        console.log('hook2')
        await nitro.storage.clear('redis')
      }
    })
  },
})
