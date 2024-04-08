import { ofetch } from 'ofetch'
import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit'

const PAGESIZE = 20
// const PAGESIZE = 99
const FETCH_TIMEOUT = 0

const pauseFetching = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
  })
}

const defaultPages = [
  '/rss',
  '/rss/posters',
  '/',
  // '/posters/',
  // '/doe-mee/',
  // '/over-loesje/wie-is-loesje/',
  // '/over-loesje/nieuws/',
  // '/over-loesje/privacy/',
  // '/over-loesje/copyright/',
  // '/over-loesje/contact/',
  '/loesje-in-het-burgeronderwijs',
  // '/over-loesje/',
  // '/doe-mee/word-lid/',
  // '/doe-mee/blijf-op-hoogte/',
  // '/doe-mee/masterclass/',
  // '/doe-mee/donateur/',
  // '/doe-mee/vacatures/',
  // '/workshop-creatief-schrijven/',
  // '/winkeltje/',
  // '/winkeltje/categorie/aanbieding',
  // '/winkeltje/categorie/aanbieding/opruimingpockets',
  // '/winkeltje/categorie/boeken',
  // '/winkeltje/categorie/diversen',
  // '/winkeltje/categorie/diversen/badhanddoeken',
  // '/winkeltje/categorie/diversen/mokken',
  // '/winkeltje/categorie/kaarten',
  // '/winkeltje/categorie/kalenders',
  // '/winkeltje/categorie/kleding-loesje',
  // '/winkeltje/categorie/kleding-loesje/dames',
  // '/winkeltje/categorie/kleding-loesje/heren',
  // '/winkeltje/categorie/loesjes-kringloopwinkel',
  // '/winkeltje/categorie/tassen-loesje',
  // '/winkeltje/categorie/zeggen-wat-je-denkt',
]

export default defineNuxtModule({
  async setup() {
    // if (process.env.NUXT_SSR === 'false') {
    //   return
    // }
    // await fetchPagesByType('posters')
  },
  hooks: {
    'build:before': async () => {
      if (process.env.NODE_ENV === 'development') {
        return
      }
      const fetchPagesByType = async (type: string) => {
        let hasNextPage = true
        let page = 1
        const baseUrl = process.env.NUXT_PUBLIC_API_URL as string

        while (hasNextPage) {
          const apiUrl = `${baseUrl}wp-json/wp/v2/${type}/?_fields[]=link&per_page=${PAGESIZE}&page=${[
            page,
          ]}&status=publish`
          const response = await ofetch.raw(apiUrl).catch((error) => error.data)
          const totalPages = Number(response.headers.get('X-WP-TotalPages'))

          let suffix = '/'
          if (type === 'posts') {
            suffix = `/over-loesje/nieuws/`
          }

          const urls = response._data.map((r: { link: string }) =>
            r.link.replace(baseUrl, suffix),
          )
          addPrerenderRoutes(urls)

          hasNextPage = page < totalPages && process.env.NUXT_SSR !== 'false'

          page = page + 1
          pauseFetching()
        }
      }
      // await fetchPagesByType('posts')
      // await fetchPagesByType('pages')
      // await fetchPagesByType('posters')
      addPrerenderRoutes(defaultPages)
    },

    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },
})
