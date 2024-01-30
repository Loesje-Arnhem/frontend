import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'hello',
    configKey: 'hello',
  },
  defaults: {
    test: 123,
  },
  setup(options, nuxt) {
    nuxt.hook('nitro:build:before', async (nitro) => {
      // We create the `experimental` object if it doesn't exist yet
      nuxt.options.useCache2 = false
      nuxt.options.appConfig.useCache2 = false
      nuxt.options.runtimeConfig.public.useCache = false
      await nitro.storage.clear('redis')
    })
    nuxt.hook('build:done', async () => {
      // console.log('building')
      // console.log(nuxt.options.runtimeConfig.public.useCache)
      // nuxt.options.runtimeConfig.public.useCache = true
      nuxt.options.useCache2 = true
      // nuxt.options.appConfig.useCache2 = true
      console.log('My module is ready with current test option: ', options.test)
      // console.log(nuxt.options.runtimeConfig.public.useCache)

      // await nuxt._nitro.storage.clear('redis')
    })
  },

  // setup()
  // nuxt.hook('ready', () => {
  //   console.log('ready')
  //   updateAppConfig({ useCache2: true })
  // })
  // nuxt.hook('build:done', async () => {
  //   console.log('building')
  //   console.log(nuxt.options.runtimeConfig.public.useCache)
  //   nuxt.options.runtimeConfig.public.useCache = true
  //   nuxt.options.appConfig.useCache2 = true
  //   updateAppConfig({ useCache2: true })
  //   console.log(nuxt.options.runtimeConfig.public.useCache)

  //   await nuxt._nitro.storage.clear('redis')
  // })
})
