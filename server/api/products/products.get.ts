import type { IProductImage, IProductListItem } from '~~/types/Content'
import type { ResponseProducts } from '~/server/types/ResponseProducts'

export default defineEventHandler(async (event) => {
  const { woocommerce } = useRuntimeConfig()
  const query = getQuery(event)

  const url = getUrl({
    type: 'products',
    fields: [
      'name',
      'id',
      'slug',
      'price',
      'regular_price',
      'images',
      'external_url',
    ],
    pageSize: 99,
    image: true,
    featured: query.featured === 'true',
    include: query.productIds?.toString() || undefined,
    consumerKey: woocommerce.consumerKey,
    consumerSecret: woocommerce.consumerSecret,
  })

  const response = await $fetch<ResponseProducts[]>(url)
  const items: IProductListItem[] = response.map((item) => {
    let image: IProductImage | undefined = undefined
    if (item.images.length) {
      image = {
        alt: item.images[0].alt,
        src: item.images[0].src,
      }
    }

    let regularPrice = null

    if (item.regular_price && item.price !== item.regular_price) {
      regularPrice = Number(item.regular_price)
    }
    return {
      id: item.id,
      slug: item.slug,
      title: item.name,
      price: Number(item.price) || null,
      regularPrice,
      externalUrl: item.external_url || null,
      image,
    }
  })
  return items
})
