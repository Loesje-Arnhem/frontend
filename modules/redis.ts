import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('nitro:build:before', async (nitro) => {
      await nitro.storage.clear('redis')
    })
  },
})
