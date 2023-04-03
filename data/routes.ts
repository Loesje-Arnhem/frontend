import fetch from 'node-fetch'

const fetchByType = async (type: string) => {
  const baseUrl = 'https://shop.loesje.nl'
  const apiUrl = `${baseUrl}/wp-json/wp/v2/${type}/?_fields[]=link&per_page=99`
  const response = await fetch(apiUrl)
  const data = (await response.json()) as { link: string }[]
  return data.map((r) => r.link.replace(baseUrl, ''))
}

export default async () => {
  const pages = await fetchByType('pages')
  const posts = await fetchByType('posts')
  return [...pages, ...posts]
}
