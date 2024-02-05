import { PaymentGatewaysSchema } from '~/server/types/PaymentGatewaysSchema'
import type { PaymentGatewaysType } from '~/types/PaymentGateways'

const sortByOrder = (items: PaymentGatewaysType) => {
  const list = items.map((item) => {
    return {
      ...item,
      order: Number(item.order) === 0 ? 99 : item.order,
    }
  })
  return list.sort((a, b) => Number(a.order) - Number(b.order))
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  try {
    const response = await $fetch(
      `https://shop.loesje.nl/wp-json/wc/v3/payment_gateways`,

      {
        params: {
          consumer_key: config.woocommerce.consumerKey,
          consumer_secret: config.woocommerce.consumerSecret,
        },
      },
    )

    const parsed = PaymentGatewaysSchema.safeParse(response)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    const orderedItems = sortByOrder(parsed.data)
    const enabledItems = orderedItems.filter((item) => item.enabled)
    return enabledItems
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.data.message,
    })
  }
})
