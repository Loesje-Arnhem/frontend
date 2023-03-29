import { IPost } from '~~/interfaces/IContent'
import { IResponsePost } from '~/server/types/IResponsePost'

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

    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'])

    let youtubeId: string | null = null
    if (item.acf.youtube_id) {
      youtubeId = item.acf.youtube_id
    }

    const post: IPost = {
      id: item.id,
      date: item.date,
      title: item.title.rendered,
      content: item.content.rendered,
      seo: item.yoast_head_json,
      featuredImage,
      youtubeId,
      relatedPosters: getRelatedPosters(item),
    }
    return post
  }
  return null
})
