import { IPosterListItem } from '~~/interfaces/IContent'
import { IResponsePosters } from '~~/interfaces/IResponse'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug'],
    image: true,
    pageSize: 7,
    search: query.search,
  })

  const response = await $fetch<IResponsePosters[]>(url, {})
  const items: IPosterListItem[] = response.map((item) => {
    const featuredImage = getFeaturedImage(item._embedded)

    return {
      slug: item.slug,
      title: item.title.rendered,
      featuredImage,
    }
  })
  return items
})
