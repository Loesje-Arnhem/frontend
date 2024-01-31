import { z } from 'zod'
import type { ResponseProductCategory } from '~/server/types/ResponseProductCategory'
import { IProductCategory } from '~/types/Content'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event) => {

  const { woocommerce } = useRuntimeConfig()

  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  )

  if (!query.success) {
    throw query.error.issues
  }

  const url = getUrl({
    type: 'products/categories',
    fields: ['name', 'id', 'description'],
    slug: query.data.slug,
    consumerKey: woocommerce.consumerKey,
    consumerSecret: woocommerce.consumerSecret,
  })

  const response = await $fetch<ResponseProductCategory>(url)
  if (!response.length) {
    return null
  }
  const { id, name, description } = response[0]

  const item: IProductCategory = {
    id,
    title: name,
    content: description
  }


  return item
})
