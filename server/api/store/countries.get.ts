import { CountriesSchema, ShippingZonesSchema } from '~/types/Countries'

const sortByOrder = (items: { name: string, order: number }[]) => {
  const list = items.map((item) => {
    return item
  })
  return list.sort((a, b) => Number(a.order) - Number(b.order))
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const getCountries: Promise<{ code: string, name: string }[]> = new Promise(
    (resolve, reject) => {
      $fetch(`https://shop.loesje.nl/wp-json/wc/v3/data/countries`, {
        params: {
          consumer_key: config.woocommerce.consumerKey,
          consumer_secret: config.woocommerce.consumerSecret,
        },
      }).then((response) => {
        const parsed = CountriesSchema.safeParse(response)
        if (!parsed.success) {
          return reject(
            createError({
              statusCode: 400,
              statusMessage: 'Something went wrong',
            }),
          )
        }

        resolve(parsed.data)
      })
    },
  )

  const getShippingZones: Promise<{ name: string, order: number }[]>
    = new Promise((resolve, reject) => {
      $fetch(`https://shop.loesje.nl/wp-json/wc/v3/shipping/zones`, {
        params: {
          consumer_key: config.woocommerce.consumerKey,
          consumer_secret: config.woocommerce.consumerSecret,
        },
      }).then((response) => {
        const parsed = ShippingZonesSchema.safeParse(response)
        if (!parsed.success) {
          return reject(
            createError({
              statusCode: 400,
              statusMessage: 'Something went wrong',
            }),
          )
        }

        resolve(parsed.data)
      })
    })

  return Promise.all([getCountries, getShippingZones]).then(
    ([countries, shippingZones]) => {
      const sortedShippingZodes = sortByOrder(shippingZones)
      const shippingZonesWithCode = sortedShippingZodes.map((shippingZone) => {
        const code = countries.find(
          country => country.name === shippingZone.name,
        )

        return {
          name: shippingZone.name,
          code: code ? code.code : '',
        }
      })
      const items = shippingZonesWithCode.filter(
        shippingZode => shippingZode.code,
      )
    },
  )
})
