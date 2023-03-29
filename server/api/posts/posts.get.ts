import { IPostListItem } from '~~/interfaces/IContent'
import { IResponsePosts } from '~/server/types/IResponsePosts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let pageSize = 0
  let exclude = 0
  if (query.pageSize) {
    pageSize = Number(query.pageSize)
  }
  if (query.exclude) {
    exclude = Number(query.exclude)
  }

  const url = getUrl({
    type: 'posts',
    fields: ['title', 'excerpt', 'date', 'slug'],
    pageSize,
    image: true,
    exclude,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const total = Number(response.headers.get('X-WP-TotalPages'))
  const items = response._data.map((item: IResponsePosts) => {
    return {
      slug: item.slug,
      title: item.title.rendered,
      excerpt: item.excerpt.rendered,
      date: item.date,
    }
  }) as IPostListItem[]
  return {
    total,
    items,
  }
})
