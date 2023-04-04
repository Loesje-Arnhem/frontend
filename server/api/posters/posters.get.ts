import { IPosterListItem } from '~~/interfaces/IContent'
import { IResponsePosters } from '~/server/types/IResponsePosters'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let pageSize = 20
  if (query.pageSize) {
    pageSize = query.pageSize
  }

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize,
    exclude: query.exclude || null,
    subjectIds: query.subjectIds || null,
    search: query.search || null,
  })

  const response = await $fetch<IResponsePosters[]>(url, {})
  const items: IPosterListItem[] = response.map((item) => {
    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'], item.title.rendered)

    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      featuredImage,
    }
  })
  return items
})
