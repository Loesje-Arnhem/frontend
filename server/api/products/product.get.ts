import type { IProduct, IProductImage, IProductListItem } from '~~/types/Content'
import { z } from 'zod'
import type { ResponseProduct } from '~/server/types/ResponseProduct'
import { title } from '~/data/siteDetails'

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
    type: 'products',
    fields: [
      'name',
      'id',
      'price',
      'regular_price',
      'images',
      'description',
      'short_description',
      'related_ids'
    ],
    image: true,
    slug: query.data.slug,
    consumerKey: woocommerce.consumerKey,
    consumerSecret: woocommerce.consumerSecret,
  })

  const response = await $fetch<ResponseProduct[]>(url)

  if (!response.length) {
    return null
  }

  const images: IProductImage[] = response[0].images.map(image => {
    return {
      alt: image.alt,
      src: image.src,
    }
  })


  const { id, name, price, regular_price, description, short_description, related_ids } = response[0]
  let regularPrice = null
  if (regular_price && price !== regular_price) {
    regularPrice = Number(regular_price)
  }


  const item: IProduct = {
    id,
    title: name,
    price: Number(price) || null,
    regularPrice,
    description,
    relatedProductIds: related_ids,
    excerpt: short_description,
    images
  }

  return item
})
