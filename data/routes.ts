import fetch from 'node-fetch'

const fetchByType = async (type: string) => {
  const baseUrl = 'https://shop.loesje.nl'
  const apiUrl = `${baseUrl}/wp-json/wp/v2/${type}/?_fields[]=link&per_page=20`
  const response = await fetch(apiUrl)
  const data = (await response.json()) as { link: string }[]
  let suffix = ''
  if (type === 'posts') {
    suffix = `/over-loesje/nieuws`
  }
  return data.map((r) => r.link.replace(baseUrl, suffix))
}

export default async () => {
  const posts = await fetchByType('posts')
  const pages = await fetchByType('pages')
  const posters = await fetchByType('posters')
  return [...posts, ...pages, ...posters]
}
