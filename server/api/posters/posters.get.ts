import { IPosterListItem } from '~~/interfaces/IContent'
import { IResponsePosters } from '~/server/types/IResponsePosters'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let pageSize = 20
  let exclude = 0
  let subjectIds: null | string = null
  if (query.pageSize) {
    pageSize = Number(query.pageSize)
  }
  if (query.exclude) {
    exclude = Number(query.exclude)
  }
  if (query.subjectIds) {
    subjectIds = query.subjectIds
  }
  console.log(subjectIds)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize,
    exclude,
    subjectIds,
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
