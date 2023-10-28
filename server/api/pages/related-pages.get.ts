import { type IRelatedPage } from '~~/types/Content'
import { type ResponseRelatedPage } from '~/server/types/ResponseRelatedPage'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { wpUrl } = useAppConfig()

  const url = getUrl({
    parent: Number(query.parentId),
    type: 'pages',
    fields: ['title', 'excerpt', 'link'],
  })
  const response = await $fetch<ResponseRelatedPage[]>(url)
  if (!response) {
    return []
  }
  const pages: IRelatedPage[] = response.map((page) => {
    return {
      uri: page.link.replace(wpUrl, ''),
      id: page.id,
      title: page.title.rendered,
      excerpt: page.excerpt.rendered,
    }
  })
  return pages
})
