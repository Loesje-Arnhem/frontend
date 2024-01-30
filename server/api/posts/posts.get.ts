import { type IPostListItem } from '~~/types/Content'
import { type ResponsePosts } from '~/server/types/ResponsePosts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let pageSize = 0
  if (query.pageSize) {
    pageSize = Number(query.pageSize)
  }
  const page = query.page ? Number(query.page) : 1

  const url = getUrl({
    type: 'posts',
    fields: ['title', 'excerpt', 'date', 'slug'],
    pageSize,
    page,
    image: true,
    exclude: query.exclude || null,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))
  const items = response._data.map((item: ResponsePosts) => {
    return {
      slug: item.slug,
      title: item.title.rendered,
      excerpt: item.excerpt.rendered,
      date: item.date,
    }
  }) as IPostListItem[]
  return {
    hasNextPage: page < totalPages,
    items,
  }
})
