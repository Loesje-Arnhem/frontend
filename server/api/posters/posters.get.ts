import { type IPosterListItem } from '~~/types/Content'
import { type ResponsePosters } from '~/server/types/ResponsePosters'
import { getStorageKey } from '~/server/utils/getStorageKey'
import { z } from 'zod'

const querySchema = z.object({
  pageSize: z.string().default('20'),
  page: z.string().default('1'),
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

  const pageSize = Number(query.data.pageSize)
  const page = Number(query.data.page)

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id'],
    image: true,
<<<<<<< HEAD
    pageSize,
=======
    pageSize: Number(query.data.pageSize),
>>>>>>> rest
    include: query.data.include,
    exclude: query.exclude || null,
    subjectIds: query.subjectIds || null,
    sourceIds: query.sourceIds || null,
    search: query.data.search,
<<<<<<< HEAD
    page,
=======
    page: Number(query.data.page),
>>>>>>> rest
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
    hasNextPage: Number(query.data.page) < totalPages,
    items,
  }
  // await storage.setItem(key, data)

  return data
})
