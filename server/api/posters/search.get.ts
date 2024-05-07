import { z } from 'zod'
import type { IPostersSearchResult } from '~~/types/Content'

const querySchema = z.object({
  search: z.string(),
})

const responseSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),
  }),
)

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, body =>
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

  const response = await $fetch(url)
  const parsed = responseSchema.safeParse(response)

  if (!parsed.success) {
    throw parsed.error.issues
  }

  const items: IPostersSearchResult[] = parsed.data.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
    }
  })
  return items
})
