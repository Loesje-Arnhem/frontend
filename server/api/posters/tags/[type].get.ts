import { Taxonomy } from '~~/enums/taxonomy'
import { ITag } from '~~/interfaces/IContent'
import { IResponseTerm } from '~~/server/types/IResponseTerm'

export default defineEventHandler(async (event) => {
  const type = event.context.params?.type
  if (!type) {
    return []
  }

  const url = getUrl({
    type,
    fields: ['name', 'slug', 'id'],
    pageSize: 50,
  })

  const response = await $fetch<IResponseTerm[]>(url, {})
  if (!response) {
    return []
  }
  const items: ITag[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.name,
    }
  })
  return items
})
