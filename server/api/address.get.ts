export default defineEventHandler(async (event) => {
  const { postcode, houseNumber, houseNumberAddition } = getQuery(event)
  const config = useRuntimeConfig()

  const { key, secret } = config.postcode.api
  const credentials = btoa(`${key}:${secret}`)

  const response = await $fetch<{
    street: string
    city: string
  }>(
    `https://api.postcode.eu/nl/v1/addresses/postcode/${postcode}/${houseNumber}/${houseNumberAddition}`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    },
  ).catch((err) => {
    const errorCode = err.data.statusMessage
    if (errorCode === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return 1
    }
    throw createError({
      statusCode: 400,
      statusMessage: err,
    })
  })

  if (typeof response === 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'errorCode',
    })
  }

  return response
})
