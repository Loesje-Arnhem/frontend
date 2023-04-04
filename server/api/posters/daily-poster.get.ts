import { IDailyPoster } from '~~/interfaces/IContent'
import { IResponseDailyPoster } from '~/server/types/IResponseDailyPoster'

export default defineEventHandler(async () => {

  const url = getUrl({
    type: 'daily-posters',
    fields: ['title', 'slug', 'id'],
    image: true,
    pageSize: 1,
  })

  const response = await $fetch<IResponseDailyPoster[]>(url, {})
  if (response.length) {
    const item = response[0]

    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'], item.title.rendered)
    const poster: IDailyPoster ={
      id: item.id,
      slug: item.slug,
      featuredImage,
  }
  return poster
  }
})
