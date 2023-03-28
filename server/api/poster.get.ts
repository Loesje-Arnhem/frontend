import { IPoster } from '~~/interfaces/IContent'
import { IResponsePoster } from '~~/interfaces/IResponse'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = getUrl({
    slug: query.slug,
    image: true,
    type: 'posters',
    fields: ['title', 'yoast_head_json', 'slug', 'acf'],
  })
  const response = await $fetch<IResponsePoster[]>(url)
  if (response.length) {
    const item = response[0]
    const featuredImage = getFeaturedImage(item._embedded)

    const pattern = /(\d{4})(\d{2})(\d{2})/
    const date = new Date(item.acf.date.replace(pattern, '$1-$2-$3'))
    const poster: IPoster = {
      id: item.id,
      title: item.title.rendered,
      date: date.toString(),
      pdf: item.acf.pdf,
      featuredImage,
    }
    return poster
  }
  return null
})
