import { IPosterListItem } from '~~/interfaces/IContent'
import { IResponsePosters } from '../types/IResponsePosters'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize: 7,
    search: query.search || null,
  })

  const response = await $fetch<IResponsePosters[]>(url, {})
  const items: IPosterListItem[] = response.map((item) => {
    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'])

    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      featuredImage,
    }
  })
  return items
})
