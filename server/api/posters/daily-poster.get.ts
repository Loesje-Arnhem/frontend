import { ResponsePoster } from '~/server/types/ResponsePoster'
import { FeaturedImage } from '~/types/Content'

const addTrailingZeroToValue = (value: number) => {
  if (value < 10) {
    return `0${value}`
  } else {
    return value.toString()
  }
}

const getDate = () => {
  const date = new Date()
  const month = addTrailingZeroToValue(date.getMonth() + 1)
  const day = addTrailingZeroToValue(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}

export default defineEventHandler(async () => {
  const storage = useStorage('redis')

  const key = `daily-poster-${getDate()}`

  if (await storage.getItem(key)) {
    return await storage.getItem<FeaturedImage>(key)
  }

  const url = getUrl({
    type: 'daily-posters',
    fields: ['title'],
    image: true,
    date: getDate(),
  })

  const response = await $fetch<ResponsePoster[]>(url)

  if (response.length < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No Poster found',
    })
  }

  const featuredImage: FeaturedImage | undefined = getFeaturedImage(
    response[0]._embedded['wp:featuredmedia'],
    response[0].title.rendered,
  )

  if (!featuredImage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No Poster found',
    })
  } else {
    await storage.setItem(key, featuredImage)
    return featuredImage
  }
})
