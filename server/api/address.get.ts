export default defineEventHandler(async (event) => {
  const { postcode, houseNumber, houseNumberAddition } = getQuery(event)
  const config = useRuntimeConfig()

  const { key, secret } = config.postcode.api
  const credentials = btoa(`${key}:${secret}`)
  const { street, city } = await $fetch<{
    street: string
    city: string
  }>(
    `https://api.postcode.eu/nl/v1/addresses/postcode/${postcode}/${houseNumber}/${houseNumberAddition}`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    },
  )
  return {
    street,
    city,
  }
})
