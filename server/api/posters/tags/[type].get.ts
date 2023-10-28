import { type ITag } from '~~/types/Content'
import { type ResponseTerm } from '~~/server/types/ResponseTerm'

export default defineEventHandler(async (event) => {
  const type = event.context.params?.type
  if (!type) {
    return []
  }

  const url = getUrl({
    type,
    fields: ['name', 'slug', 'id', 'taxonomy'],
    pageSize: 99,
  })

  const response = await $fetch<ResponseTerm[]>(url, {})
  if (!response) {
    return []
  }
  const items: ITag[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.name,
      type: item.taxonomy,
    }
  })
  return items
})
