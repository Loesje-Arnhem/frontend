import type { FeaturedImage, IProduct, IProductImage, IProductListItem } from '~~/types/Content'
import { z } from 'zod'
import type { ResponseProduct } from '~/server/types/ResponseProduct'
import { title } from '~/data/siteDetails'

const querySchema = z.object({
  slug: z.string(),
})

export default defineEventHandler(async (event) => {

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
      'related_ids',
      'attributes',
    ],
    image: true,
    slug: query.data.slug,
    isCommerce: true
  })

  const response = await $fetch<ResponseProduct[]>(url)

  if (!response.length) {
    return null
  }

  const images: FeaturedImage[] = response[0].images.map(image => {
    return {
      alt: image.alt,
      src: image.src,
      srcSet: image.srcset
    }
  })


  const { id, name, price, regular_price, description, short_description, related_ids, attributes } = response[0]
  let regularPrice = undefined
  if (regular_price && price !== regular_price) {
    regularPrice = Number(regular_price)
  }


  const item: IProduct = {
    id,
    title: name,
    price: Number(price) || undefined,
    regularPrice,
    description,
    relatedProductIds: related_ids,
    excerpt: short_description,
    images,
    attributes
  }

  return item
})
