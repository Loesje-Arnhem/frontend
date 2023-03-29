import { IPage } from '~~/interfaces/IContent'
import { IResponsePage } from '../types/IResponsePage'

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
    fields: ['title', 'content', 'yoast_head_json', 'parent', 'acf'],
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
    if (response.acf.youtube_id) {
      youtubeId = response.acf.youtube_id
    }
    const featuredImage = getFeaturedImage(
      response._embedded['wp:featuredmedia'],
    )
    const page: IPage = {
      id: response.id,
      parentId: response.parent || response.id,
      title: response.title.rendered,
      content: response.content.rendered,
      seo: response.yoast_head_json,
      relatedProducts,
      youtubeId,
      featuredImage,
      relatedPosters: getRelatedPosters(response),
    }
    return page
  }
  return null
})
