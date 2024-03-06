import { ResponsePoster } from '~/server/types/ResponsePoster'
import { getDate } from '~/server/utils/getDate'
import { FeaturedImage } from '~/types/Content'

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
      data: {
        message: 'No Poster found',
      },
    })
  }

  const featuredImage: FeaturedImage | undefined = getFeaturedImage(
    response[0]._embedded['wp:featuredmedia'],
    response[0].title.rendered,
  )

  if (!featuredImage) {
    throw createError({
      statusCode: 400,
      data: {
        message: 'No Poster found',
      },
    })
  } else {
    await storage.setItem(key, featuredImage)
    return featuredImage
  }
})
