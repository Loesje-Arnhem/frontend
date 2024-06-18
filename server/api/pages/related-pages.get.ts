import { type IRelatedPage } from '~~/types/Content'
import { type ResponseRelatedPage } from '~/server/types/ResponseRelatedPage'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { wpUrl } = useAppConfig()

  const response = await $fetch('/api/menu')

  // const url = getUrl({
  //   parent: Number(query.parentId),
  //   exclude: query.exclude?.toString(),
  //   type: 'pages',
  //   fields: ['title', 'excerpt', 'link'],
  // })
  // const response = await $fetch<ResponseRelatedPage[]>(url)
  if (!response) {
    return []

  }
return response
  const pages = response.find(item => item.id === query.parentId)

  if (!pages) {
    return []
  }
  const pages2: IRelatedPage[] = response.map((page) => {
    return {
      uri: page.url,
      id: page.id,
      title: page.title,
      excerpt: 'test',
    }
  })
  return pages2
})
