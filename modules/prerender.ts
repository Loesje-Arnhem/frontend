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
  '/',
  '/posters',
  '/doe-mee/',
  '/doe-mee/masterclass/',
  '/doe-mee/donateur/',
  '/doe-mee/vacatures/',
  '/over-loesje/',
  '/over-loesje/wie-is-loesje/',
  '/over-loesje/privacy/',
  '/over-loesje/copyright/',
  '/over-loesje/contact/',
  '/over-loesje/het-huishoudboekje-van-loesje/',
  '/workshop-creatief-schrijven/',
  '/winkeltje',
  '/winkeltje/categorie/aanbieding/',
  '/winkeltje/categorie/diversen/badhanddoeken/',
  '/winkeltje/categorie/boeken/',
  '/winkeltje/categorie/kleding-loesje/dames/',
  '/winkeltje/categorie/diversen/',
  '/winkeltje/categorie/kleding-loesje/heren/',
  '/winkeltje/categorie/kaarten/',
  '/winkeltje/categorie/kalenders/',
  '/winkeltje/categorie/kleding-loesje/',
  '/winkeltje/categorie/loesjes-kringloopwinkel/',
  '/workshop-creatief-schrijven/',
  '/doe-mee/',
  '/over-loesje/nieuws/',
  '/over-loesje/copyright/',
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
          hasNextPage = false

          page = page + 1
          pauseFetching()
        }
      }
      await fetchPagesByType('posts')
      // await fetchPagesByType('pages')
      addPrerenderRoutes(defaultPages)
    },

    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },
})
