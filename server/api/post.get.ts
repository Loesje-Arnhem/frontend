import {  IPost } from '~~/interfaces/IContent'
import { IResponsePost } from '../types/IResponsePost'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = getUrl({
    slug: query.slug,
    image: true,
    type: 'posts',
    fields: ['title', 'content', 'yoast_head_json', 'date', 'acf'],
  })
  const response = await $fetch<IResponsePost[]>(url)

  if (response.length) {
    const item = response[0]

    const featuredImage = getFeaturedImage(
      item._embedded['wp:featuredmedia'],
    )

    const post: IPost = {
      id: item.id,
      date: item.date,
      title: item.title.rendered,
      content: item.content.rendered,
      seo: item.yoast_head_json,

      featuredImage,
      relatedPosters: getRelatedPosters(item),
    }
    return post
  }
  return null
})
