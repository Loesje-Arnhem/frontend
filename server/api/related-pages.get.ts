import { IRelatedPage } from '~~/interfaces/IContent'
import { IResponseRelatedPage } from '~~/interfaces/IResponse'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { wpUrl } = useAppConfig()

  const url = getUrl({
    parent: Number(query.parentId),
    type: 'pages',
    fields: ['title', 'excerpt', 'link'],
  })
  const response = await $fetch<IResponseRelatedPage[]>(url)
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
