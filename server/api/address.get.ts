const geti18nErrorKey = (key: string) => {
  switch (key) {
    case 'PostcodeNl_Service_PostcodeAddress_AddressNotFoundException':
      return 'addressNotFound'
    default:
      return 'formError'
  }
}

export default defineEventHandler(async (event) => {
  const { postcode, houseNumber, houseNumberSuffix } = getQuery(event)
  const config = useRuntimeConfig()

  const { key, secret } = config.postcode.api
  const credentials = btoa(`${key}:${secret}`)

  const response = await $fetch<{
    street: string
    city: string
  }>(
    `https://api.postcode.eu/nl/v1/addresses/postcode/${postcode}/${houseNumber}/${houseNumberSuffix}`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    },
  ).catch((err) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: geti18nErrorKey(err.data.exceptionId),
    })
  })

  if (typeof response === 'number') {
    throw createError({
      statusCode: 400,
      data: {
        message: 'errorCode',
      },
    })
  }

  return response
})
