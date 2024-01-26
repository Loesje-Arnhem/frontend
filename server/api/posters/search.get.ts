import { IPostersSearchResult } from '~~/interfaces/IContent'
import { IResponsePostersSearchResult } from '~~/server/types/IResponsePostersSearchResultResult'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    pageSize: 10,
    search: query.search,
  })

  const response = await $fetch<IResponsePostersSearchResult[]>(url, {})
  const items: IPostersSearchResult[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
    }
  })
  return items
})
