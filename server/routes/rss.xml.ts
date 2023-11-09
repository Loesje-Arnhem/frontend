import RSS from 'rss'
import type { ResponsePosts } from '../types/ResponsePosts'

export default defineEventHandler(async (event) => {

  const { rssHead } = useAppConfig()

  const feed = new RSS({
    ...rssHead,
    title: 'Loesje',
    feed_url: `https://www.loesje.nl/rss.xml`,
    description: `
      Loesje's posters vind je overal. Met haar positief-kritische teksten
      wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
      bazen, politici of ouders. Door haar posters op straat en online te
      verspreiden, geeft Loesje de wereld een zetje in de goede richting.`,
  })

  const url = getUrl({
    type: 'posts',
    fields: ['title', 'slug', 'date', 'excerpt'],
    pageSize: 20,
    image: true
  })

  const data = await $fetch<ResponsePosts[]>(url)

  data.forEach(item => {
    const link = `https://www.loesje.nl/over-loesje/nieuws/${item.slug}`
    feed.item({
      title: item.title.rendered,
      description: item.excerpt.rendered,
      date: item.date,
      url: link,
      guid: link,
      author: 'Loesje',
    })
  });

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})