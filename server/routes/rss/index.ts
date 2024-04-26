import RSS, { EnclosureObject } from 'rss'
import type { ResponsePosts } from '@/server/types/ResponsePosts'
import { FeaturedImageResponseType } from '~/server/types/FeaturedImageResponseType'

export default defineEventHandler(async (event) => {
  const { rssHead } = useAppConfig()

  const feed = new RSS({
    ...rssHead,
    title: 'Loesje - Nieuws',
    feed_url: `https://www.loesje.nl/rss`,
    description: `
      Loesje's posters vind je overal. Met haar positief-kritische teksten
      wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
      bazen, politici of ouders. Door haar posters op straat en online te
      verspreiden, geeft Loesje de wereld een zetje in de goede richting.`,
  })

  const url = getUrl({
    type: 'posts',
    fields: ['title', 'slug', 'date', 'content'],
    pageSize: 20,
    image: true,
  })

  const data = await $fetch<ResponsePosts[]>(url)

  data.forEach((item) => {
    const images = item._embedded['wp:featuredmedia']

    const featuredImage = getFeaturedImage(
      item._embedded['wp:featuredmedia'],
      item.title.rendered,
    )

    if (!images?.length || !featuredImage) {
      return
    }

    const image = images[0].media_details.sizes.medium_large

    let enclosure: EnclosureObject | undefined = undefined
    if (image) {
      enclosure = {
        url: image.source_url,
        type: image.mime_type,
        size: image.filesize,
      }
    }

    const link = `https://www.loesje.nl/over-loesje/nieuws/${item.slug}`
    feed.item({
      title: item.title.rendered,
      description: item.content.rendered,
      date: item.date,
      url: link,
      guid: link,
      author: 'Loesje',
      enclosure,
    })
  })
  return feed.xml({ indent: true })
})
