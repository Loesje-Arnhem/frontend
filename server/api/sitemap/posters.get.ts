import { asSitemapUrl } from '#imports'
import { postersSitemap } from '~/server/data/postersSitemap'
import { SitemapSchema } from '~/server/schemas/SitemapSchema'

export default defineSitemapEventHandler(async () => {
  let hasNextPage = true
  let page = 1

  const items = <ReturnType<typeof asSitemapUrl>[]>[]

  while (hasNextPage) {
    const url = getUrl({
      type: 'posters',
      fields: ['link', 'modified'],
      pageSize: 99,
      page,
      image: true,
      dateAfter: '2024-01-01',
    })

    const response = await $fetch.raw(url)

    const parsed = SitemapSchema.safeParse(response._data)

    if (!parsed.success) {
      throw parsed.error.issues
    }

    const totalPages = Number(response.headers.get('X-WP-TotalPages'))

    const items2 = <ReturnType<typeof asSitemapUrl>[]>parsed.data.map(
      (item) => {
        const image:
          | {
              loc: string
              caption: string
              title: string
            }
          | undefined = undefined

        // if (item._embedded) {
        //   const featuredImages = item._embedded['wp:featuredmedia']

        //   const featuredImage = getFeaturedImage(featuredImages)

        //   if (featuredImage) {
        //     image = {
        //       loc: featuredImage.src,
        //       title: featuredImage.alt,
        //       caption: featuredImage.alt,
        //     }
        //   }
        // }

        const loc = item.link.replace('https://shop.loesje.nl/', '/')

        return {
          loc,
          modified: new Date(item.modified),
          images: image ? [image] : undefined,
        }
      },
    )
    hasNextPage = page < totalPages
    page = page + 1
    hasNextPage = false
    items.push(...items2)
  }

  items.push(...postersSitemap)
  return items
})
