import { ofetch } from 'ofetch'

const PAGESIZE = 20
// const PAGESIZE = 99
const FETCH_TIMEOUT = 0

const pauseFetching = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
  })
}

const fetchPagesByType = async (type: string) => {
  const pages = []
  let hasNextPage = true
  let page = 1
  const baseUrl = process.env.NUXT_PUBLIC_API_URL as string

  while (hasNextPage) {
    const apiUrl = `${baseUrl}wp-json/wp/v2/${type}/?_fields[]=link&per_page=${PAGESIZE}&page=${[
      page,
    ]}&status=publish`
    const data = await ofetch<{ link: string }[]>(apiUrl)

    let suffix = ''
    if (type === 'posts') {
      suffix = `/over-loesje/nieuws/`
    }

    const urls = data.map((r) => r.link.replace(baseUrl, suffix))
    pages.push(...urls)
    if (urls.length !== PAGESIZE) {
      hasNextPage = false
    }
    page = page + 1
    pauseFetching()
  }
  return pages
}

export default async () => {
  const posts = await fetchPagesByType('posts')
  const pages = await fetchPagesByType('posts')
  // const posters = await fetchPagesByType('posters')
  // return pages
  return [...posts, ...pages]
}
