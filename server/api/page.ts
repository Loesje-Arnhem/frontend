import { IPage } from '~~/interfaces/IContent'
import { IResponsePage } from '~~/interfaces/IResponse'

export default defineEventHandler(async (event) => {
  let slug: undefined | string = undefined
  let id: undefined | number = undefined
  const query = getQuery(event)
  if (query?.slug) {
    slug = query.slug
  }
  if (query?.id) {
    id = Number(query.id)
  }
  const url = getUrl({
    slug,
    id,
    image: true,
    type: 'pages',
    fields: ['title', 'content', 'yoast_head_json', 'acf'],
  })
  let response: IResponsePage | null = null
  if (slug) {
    const items = await $fetch<IResponsePage[]>(url)
    if (items.length) {
      response = items[0]
    }
  } else {
    response = await $fetch<IResponsePage>(url)
  }
  if (response) {
    let relatedProducts: number[] = []
    if (response.acf.related_products_products) {
      relatedProducts = response.acf.related_products_products.map(
        (p) => p.product,
      )
    }
    let youtubeId: string | null = null
    if (response.youtube_id) {
      youtubeId = response.youtube_id
    }
    const featuredImage = getFeaturedImage(response._embedded)
    const page: IPage = {
      title: response.title.rendered,
      content: response.content.rendered,
      seo: response.yoast_head_json,
      relatedProducts,
      youtubeId,
      featuredImage,
      relatedPosters: {},
    }
    return page
  }
  return null
})
