// import { defineNuxtModule } from '@nuxt/kit'
// import getAllRoutes from './../data/routes'

// export default defineNuxtModule({
//   setup(options, nuxt) {
//     // nuxt.hook('nitro:config', async (nitroConfig) => {
//     //   if (nitroConfig.dev) {
//     //     return
//     //   }
//     //   const pages = await getAllRoutes()
//     //   if (nitroConfig?.prerender?.routes) {
//     //     nitroConfig.prerender.routes.push(...pages)
//     //   }
//     //   return
//     // })
//     const route = useRoute()

//     prerenderRoutes(['/doneer/', '/postergebruiken/'])
//     // nuxt.hook('ready', () => {
//     //   const route = useRoute()

//     //   prerenderRoutes(['/doneer/', '/postergebruiken/'])
//     // })
//   },
// })

import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit'

export default defineNuxtModule({
  async setup() {
    await addPrerenderRoutes(['/doneer', '/postergebruiken'])
  },
})
