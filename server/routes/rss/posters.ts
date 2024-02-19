import RSS, { EnclosureObject } from 'rss'
import type { FeaturedImageResponseType } from '@/server/types/FeaturedImageResponseType'

const getPosterDate = (date: string) => {
  const pattern = /(\d{4})(\d{2})(\d{2})/ // date via posters is 24/03/2010
  const regex = RegExp(pattern)
  if (!regex.test(date)) {
    return null
  }
  return new Date(date.replace(pattern, '$1-$2-$3'))
}

export default defineEventHandler(async (event) => {
  const { rssHead, title } = useAppConfig()

  const feed = new RSS({
    ...rssHead,
    title,
    feed_url: `https://www.loesje.nl/rss/posters`,
    description: `
      Loesje's posters vind je overal. Met haar positief-kritische teksten
      wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
      bazen, politici of ouders. Door haar posters op straat en online te
      verspreiden, geeft Loesje de wereld een zetje in de goede richting.`,
  })

  const url = getUrl({
    type: 'posters',
    fields: ['title', 'slug', 'id', 'acf'],
    image: true,
    pageSize: 20,
  })

  const data = await $fetch<
    {
      id: number
      date: string
      title: {
        rendered: string
      }
      slug: string
      _embedded: {
        'wp:featuredmedia'?: FeaturedImageResponseType[]
      }
      acf: {
        date: string
      }
    }[]
  >(url)

  data.forEach((item) => {
    const link = `https://www.loesje.nl/posters/${item.slug}`
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

    feed.item({
      title: item.title.rendered,
      date: getPosterDate(item.acf.date) || item.date,
      url: link,
      guid: link,
      author: 'Loesje',
      description: item.title.rendered,
      enclosure,
    })
  })

  return feed.xml({ indent: true })
})
