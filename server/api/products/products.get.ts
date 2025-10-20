import { z } from 'zod'
import type { FeaturedImage, IProductListItem } from '~/types/Content'
import type { ResponseProducts } from '~~/server/types/ResponseProducts'

const querySchema = z.object({
  featured: z.string().optional(),
  productIds: z.string().optional(),
  categoryId: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, body =>
    querySchema.safeParse(body),
  )

  if (!query.success) {
    throw query.error.issues
  }

  const url = getUrl({
    type: 'products',
    fields: [
      'name',
      'id',
      'slug',
      'prices',
      'images',
      'external_url',
      'permalink',
    ],
    pageSize: 99,
    image: true,
    featured: query.data.featured === 'true',
    include: query.data.productIds,
    categoryId: query.data.categoryId,
    isCommerce: true,
  })

  const response = await $fetch<ResponseProducts[]>(url)
  const items: IProductListItem[] = response.map((item) => {
    let image: FeaturedImage | undefined = undefined
    if (item.images.length) {
      image = {
        alt: item.images[0].alt,
        src: item.images[0].src,
        srcSet: item.images[0].srcset,
      }
    }
    const { regular_price, price } = item.prices

    let regularPrice = undefined

    if (regular_price && price !== regular_price) {
      regularPrice = Number(regular_price) / 100
    }

    return {
      id: item.id,
      url: item.permalink,
      slug: item.slug,
      title: item.name,
      price: Number(price) / 100,
      regularPrice,
      externalUrl: item.external_url || null,
      image,
    }
  })
  return items
})
