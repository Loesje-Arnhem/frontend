import { type ITag } from '~~/types/Content'
import { type ResponseTags } from '~/server/types/ResponseTags'
import { Taxonomy } from '~/enums/taxonomy'

export default defineEventHandler(() => {
  const baseProps = {
    fields: ['name', 'slug', 'taxonomy'],
    pageSize: 99,
  }
  const getSources: Promise<ITag[]> = new Promise((resolve) => {
    const url = getUrl({
      ...baseProps,
      type: 'sources',
    })
    $fetch<ResponseTags[]>(url, {}).then((data) => {
      const items: ITag[] = data.map((item) => {
        return {
          id: item.id,
          slug: item.slug,
          title: item.name,
          type: Taxonomy.Source,
        }
      })
      resolve(items)
    })
  })

  const getSubjects: Promise<ITag[]> = new Promise((resolve) => {
    const url = getUrl({
      ...baseProps,
      type: 'subjects',
    })
    $fetch<ResponseTags[]>(url, {}).then((data) => {
      const items: ITag[] = data.map((item) => {
        return {
          id: item.id,
          slug: item.slug,
          title: item.name,
          type: Taxonomy.Subject,
        }
      })
      resolve(items)
    })
  })

  return Promise.all([getSources, getSubjects]).then(([sources, subjects]) => {
    return { sources, subjects }
  })
})
