import { Taxonomy } from '~~/enums/taxonomy'
import { IPoster, ITag } from '~~/interfaces/IContent'
import { IResponsePoster } from '~/server/types/IResponsePoster'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = getUrl({
    slug: query.slug,
    image: true,
    type: 'posters',
    fields: ['title', 'yoast_head_json', 'slug', 'acf'],
  })
  const response = await $fetch<IResponsePoster[]>(url)
  if (response.length) {
    const item = response[0]
    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'], item.title.rendered)

    let subjects: ITag[] = []
    let sources: ITag[] = []
    if (item._embedded['wp:term']) {
      const tags = item._embedded['wp:term'].flat()
      subjects = getTagsByType(tags, Taxonomy.Subject)
      sources = getTagsByType(tags, Taxonomy.Source)
    }

    const pattern = /(\d{4})(\d{2})(\d{2})/
    const date = new Date(item.acf.date.replace(pattern, '$1-$2-$3'))
    const poster: IPoster = {
      id: item.id,
      title: item.title.rendered,
      date: date.toString(),
      pdf: item.acf.pdf,
      featuredImage,
      subjects,
      sources,
    }
    return poster
  }
  return null
})
