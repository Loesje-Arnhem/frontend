import RSS from 'rss'

const feed = new RSS({
  title: 'Loesje',
  site_url: 'https://www.loesje.nl',
  feed_url: `https://www.loesje.nl/rss.xml`,
  language: 'nl-NL',
  generator: 'Loesje rss generator 3000',
  description: `
    Loesje's posters vind je overal. Met haar positief-kritische teksten
    wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
    bazen, politici of ouders. Door haar posters op straat en online te
    verspreiden, geeft Loesje de wereld een zetje in de goede richting.`,
  image_url: 'https://preview.loesje.nl/icons/logo.svg'
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const data = await $fetch<{
    title: {
      rendered: string,
    },
    slug: string,
    date: string,
    excerpt: {
      rendered: string
    }
  }[]>(`${config.public.apiUrl}wp-json/wp/v2/posts?per_page=20&_fields=title,excerpt,date,slug`)

  data.forEach(item => {
    const url = `https://www.loesje.nl/over-loesje/nieuws/${item.slug}`
    feed.item({
      title: item.title.rendered,
      description: item.excerpt.rendered,
      date: item.date,
      url,
      guid: url,
      author: 'Loesje',
    })
  });

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})