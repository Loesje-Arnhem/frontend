import RSS from 'rss'
import type { ResponseImage } from '../types/ResponseImage'

const getPosterDate = (date: string) => {
  const pattern = /(\d{4})(\d{2})(\d{2})/ // date via posters is 24/03/2010
  const regex = RegExp(pattern)
  if (!regex.test(date)) {
    return null
  }
  return new Date(date.replace(pattern, '$1-$2-$3'))
}

export default defineEventHandler(async (event) => {
  const { rssHead } = useAppConfig()

  const feed = new RSS({
    ...rssHead,
    title: 'Loesje Posters',
    feed_url: `https://www.loesje.nl/rss-posters.xml`,
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

  const data = await $fetch< {
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
}[]>(url)

  data.forEach(item => {
    const link = `https://www.loesje.nl/posters/${item.slug}`
    const featuredImage = getFeaturedImage(
      item._embedded['wp:featuredmedia'],
      item.title.rendered,
    )

    let description = ''
    if (featuredImage) {
      description = `<img src="${featuredImage.src}" srcset="${featuredImage.srcSet}" alt="${item.title.rendered}" width="${featuredImage.width}" height="${featuredImage.height}" />`
    }

    feed.item({
      title: item.title.rendered,
      description: description,
      date: getPosterDate(item.acf.date) || item.date,
      url: link,
      guid: link,
      author: 'Loesje',
    })
  });

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})