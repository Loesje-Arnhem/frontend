import { type IPosterListItem } from '~~/types/Content'
import { getStorageKey } from '~/server/utils/getStorageKey'
import { z } from 'zod'
import { ResponseImageSchema } from '~/server/types/ResponseImage'

const querySchema = z.object({
  pageSize: z.string().default('20'),
  page: z.string().default('1'),
  include: z.string().optional(),
  exclude: z.string().optional(),
  search: z.string().optional(),
  subjectIds: z.string().optional(),
  sourceIds: z.string().optional(),
})

const responseSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),
    _embedded: z.object({
      'wp:featuredmedia': ResponseImageSchema,
    }),
  }),
)

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

  const pageSize = Number(query.data.pageSize)
  const page = Number(query.data.page)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize,
    include: query.data.include,
    exclude: query.data.exclude,
    subjectIds: query.data.subjectIds,
    sourceIds: query.data.sourceIds,
    search: query.data.search,
    page,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))

  const parsed = responseSchema.safeParse(response._data)

  if (!parsed.success) {
    throw parsed.error.issues
  }

  const items: IPosterListItem[] = parsed.data.map((item) => {
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

  const data = {
    hasNextPage: page < totalPages,
    items,
  }
  // await storage.setItem(key, data)

  return data
})
