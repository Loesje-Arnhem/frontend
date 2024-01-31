import type { IPostersSearchResult } from '~~/types/Content'
import type { ResponsePostersSearchResult } from '~~/server/types/ResponsePostersSearchResult'
import { z } from 'zod'

const querySchema = z.object({
  search: z.string(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  )

  if (!query.success) {
    throw query.error.issues
  }

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    pageSize: 10,
    search: query.data.search,
  })

  const response = await $fetch<ResponsePostersSearchResult[]>(url, {})
  const items: IPostersSearchResult[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
    }
  })
  return items
})
