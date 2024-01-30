import { Taxonomy } from '~~/enums/taxonomy'
import type { IPoster, ITag } from '~~/types/Content'
import type { ResponsePoster } from '~/server/types/ResponsePoster'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // const storage = useStorage('redis')
  // const key = `poster-${query.slug}`

  // if (await storage.getItem(key)) {
  //   return await storage.getItem(key)
  // }
  const url = getUrl({
    slug: query.slug,
    image: true,
    type: 'posters',
    fields: ['title', 'yoast_head_json', 'slug', 'acf'],
  })

  const response = await $fetch<ResponsePoster[]>(url)
  if (response.length) {
    const item = response[0]
    const featuredImage = getFeaturedImage(
      item._embedded['wp:featuredmedia'],
      item.title.rendered,
    )

    let subjects: ITag[] = []
    let sources: ITag[] = []
    if (item._embedded['wp:term']) {
      const tags = item._embedded['wp:term'].flat()
      subjects = getTagsByType(tags, Taxonomy.Subject)
      sources = getTagsByType(tags, Taxonomy.Source)
    }

    const pattern = /(\d{4})(\d{2})(\d{2})/
    let date = undefined
    if (item.acf.date) {
      date = new Date(item.acf.date?.replace(pattern, '$1-$2-$3')).toString()
    }
    const poster: IPoster = {
      id: item.id,
      title: item.title.rendered,
      date: date,
      pdf: item.acf.pdf,
      featuredImage,
      subjects,
      slug: item.slug,
      sources,
      relatedProducts: getRelatedProducts(item),
    }
    // await storage.setItem(key, poster)
    return poster
  }
  return null
})
