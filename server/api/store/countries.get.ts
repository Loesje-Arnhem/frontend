import { CountriesSchema } from '~/types/Countries'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const response = await $fetch(
    `https://shop.loesje.nl/wp-json/wc/v3/payment_gateways`,

    {
      params: {
        consumer_key: config.woocommerce.consumerKey,
        consumer_secret: config.woocommerce.consumerSecret,
      },
    },
  )

  // const parsed = CountriesSchema.safeParse(response)

  // if (!parsed.success) {
  //   throw parsed.error.issues
  // }
  return response
})
