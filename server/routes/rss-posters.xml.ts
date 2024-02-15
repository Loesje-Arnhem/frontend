import RSS from 'rss'
import type { ResponseImage } from '../types/FeaturedImageResponseType'

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
    feed_url: `https://www.loesje.nl/rss-posters.xml`,
    description: `
      Loesje's posters vind je overal. Met haar positief-kritische teksten
      wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
      bazen, politici of ouders. Door haar posters op straat en online te
      verspreiden, geeft Loesje de wereld een zetje in de goede richting.`,
    custom_namespaces: {
      media: 'http://search.yahoo.com/mrss/',
    },
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
        'wp:featuredmedia'?: ResponseImage[]
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

    if (!image) {
      return
    }

    const description = `<img src="${featuredImage.src}" srcset="${featuredImage.srcSet}" alt="${item.title.rendered}" width="${featuredImage.width}" height="${featuredImage.height}" />`

    feed.item({
      title: item.title.rendered,
      date: getPosterDate(item.acf.date) || item.date,
      url: link,
      guid: link,
      author: 'Loesje',
      description,
      custom_elements: [
        {
          'media:content': {
            _attr: {
              medium: 'image',
              href: image.source_url,
              width: image.width,
              height: image.height,
              type: image.mime_type,
              fileSize: image.filesize,
            },
          },
        },
        {
          'media:title': item.title.rendered,
        },
      ],
    })
  })

  event.headers.set('content-type', 'text/xml')
  return feed.xml({ indent: true })
})
