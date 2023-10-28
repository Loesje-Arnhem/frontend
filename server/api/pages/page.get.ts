import { type IPage } from '~~/types/Content'
import { type ResponsePage } from '~/server/types/ResponsePage'

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
  let response: ResponsePage | null = null
  if (slug) {
    const items = await $fetch<ResponsePage[]>(url)
    if (items.length) {
      response = items[0]
    }
  } else {
    response = await $fetch<ResponsePage>(url)
  }
  if (response) {
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
      relatedProducts: getRelatedProducts(response),
      youtubeId,
      featuredImage,
      relatedPosters: getRelatedPosters(response),
    }
    return page
  }
  return null
})
