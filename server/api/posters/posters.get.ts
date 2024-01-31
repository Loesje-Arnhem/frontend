import { type IPosterListItem } from '~~/types/Content'
import { type ResponsePosters } from '~/server/types/ResponsePosters'
import { getStorageKey } from '~/server/utils/getStorageKey'
import { z } from 'zod'

const querySchema = z.object({
  pageSize: z.number().default(20),
  page: z.number().default(1),
  include: z.string().optional(),
  search: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  )

  if (!query.success) {
    throw query.error.issues
  }
  // const storage = useStorage('redis')

  // const key = getStorageKey(query, 'posters')

  // if (await storage.getItem(key)) {
  //   return await storage.getItem(key)
  // }

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize: query.data.pageSize,
    include: query.data.include,
    exclude: query.exclude || null,
    subjectIds: query.subjectIds || null,
    sourceIds: query.sourceIds || null,
    search: query.data.search,
    page: query.data.page,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))

  const items: IPosterListItem[] = response._data.map(
    (item: ResponsePosters) => {
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
    },
  )

  const data = {
    hasNextPage: page < totalPages,
    items,
  }
  // await storage.setItem(key, data)

  return data
})
