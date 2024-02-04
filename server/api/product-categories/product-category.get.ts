import { z } from 'zod'
import type { ResponseProductCategory } from '~/server/types/ResponseProductCategory'
import { IProductCategory } from '~/types/Content'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  )

  const storage = useStorage('redis')

  const key = getStorageKey(query, 'posters')

  if (await storage.getItem(key)) {
    return await storage.getItem(key)
  }

  if (!query.success) {
    throw query.error.issues
  }

  const url = getUrl({
    type: 'products/categories',
    fields: ['name', 'id', 'description', 'slug'],
    slug: query.data.slug,
    isCommerce: true,
  })

  const response = await $fetch<ResponseProductCategory>(url)
  if (!response.length) {
    return null
  }
  const category = response.find((item) => item.slug === query.data.slug)
  if (!category) {
    return null
  }
  const item: IProductCategory = {
    id: category.id,
    title: category.name,
    content: category.description,
  }
  await storage.setItem(key, item)

  return item
})
