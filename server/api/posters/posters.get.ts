import { type IPosterListItem } from '~~/types/Content'
import { type ResponsePosters } from '~/server/types/ResponsePosters'

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
    include: query.include || null,
    exclude: query.exclude || null,
    subjectIds: query.subjectIds || null,
    sourceIds: query.sourceIds || null,
    search: query.search || null,
  })

  const response = await $fetch<ResponsePosters[]>(url, {})
  const items: IPosterListItem[] = response.map((item) => {
    const featuredImage = getFeaturedImage(
      item._embedded['wp:featuredmedia'],
      item.title.rendered,
    )

    return {
      id: item.id,
      slug: item.slug,
      featuredImage,
      title: item.title.rendered,
    }
  })
  return items
})
