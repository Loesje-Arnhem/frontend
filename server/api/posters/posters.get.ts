import { type IPosterListItem } from '~~/types/Content'
import { getStorageKey } from '~/server/utils/getStorageKey'
import { getDate } from '~/server/utils/getDate'
import {
  PostersSchema,
  PostersQuerySchema,
} from '~/server/schemas/PostersSchema'

export default defineEventHandler(async (event) => {
  const storage = useStorage('redis')

  const query = await getValidatedQuery(event, (body) =>
    PostersQuerySchema.safeParse(body),
  )

  if (!query.success) {
    throw query.error.issues
  }

  const key = getStorageKey(query.data, 'posters')

  if (await storage.getItem(key)) {
    return await storage.getItem(key)
  }

  const pageSize = Number(query.data.pageSize)
  const page = Number(query.data.page)

  const dateBefore = query.data.dateBefore
    ? getDate(query.data.dateBefore)
    : undefined

  const dateAfter = query.data.dateAfter
    ? getDate(query.data.dateAfter)
    : undefined

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
    dateBefore,
    dateAfter,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))

  const parsed = PostersSchema.safeParse(response._data)

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

  await storage.setItem(key, data)

  return data
})