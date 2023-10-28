import { type IProductListItem } from '~~/types/Content'
import { type ResponseProducts } from '~~/server/types/ResponseProducts'

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
    image: true,
    include: query.productIds || null,
    consumerKey: woocommerce.consumerKey,
    consumerSecret: woocommerce.consumerSecret,
  })

  const response = await $fetch<ResponseProducts[]>(url)
  const items: IProductListItem[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.name,
      price: Number(item.price) || null,
      regularPrice: Number(item.regular_price) || null,
      externalUrl: item.external_url || null,
    }
  })
  return items
})
