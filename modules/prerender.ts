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

const defaultRoutes = [
  '/posters',
  '/workshop-creatief-schrijven'
]


export default defineNuxtModule({
  hooks: {
    'build:before': async () => {
      if (process.env.NODE_ENV === 'development') {
        return
      }

      addPrerenderRoutes(defaultRoutes)

      if (process.env.NUXT_SSR === 'false') {
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

          if (page >= totalPages) {
            hasNextPage = false
          } else if (page > 2 && (type === 'posters')) {
            hasNextPage = false
          }

          page = page + 1
          pauseFetching()
        }
      }
      await fetchPagesByType('posts')
      await fetchPagesByType('pages')
      await fetchPagesByType('posters')
    },

    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },
})
