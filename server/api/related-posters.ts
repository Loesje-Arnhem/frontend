import { IPosterListItem } from '~~/interfaces/IContent'
import { IResponsePosters } from '~~/interfaces/IResponse'

export default defineEventHandler(async (event) => {
  const url = getUrl({
    type: 'poster',
    fields: ['title', 'slug'],
    image: true,
    pageSize: 7,
  })

  const response = await $fetch<IResponsePosters[]>(url, {})
  const items: IPosterListItem[] = response.map((item) => {
    const featuredImage = getFeaturedImage(item._embedded)

    return {
      slug: item.slug,
      title: item.title.rendered,
      featuredImage,
    }
  })
  return items
})
