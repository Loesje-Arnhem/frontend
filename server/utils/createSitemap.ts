import { asSitemapUrl } from '#imports'
import { SitemapSchema } from '~/server/schemas/SitemapSchema'

export const createSitemap = async (
  type: 'posts' | 'pages' | 'product' | 'product_cat',
) => {
  let hasNextPage = true
  let page = 1

  const items = <ReturnType<typeof asSitemapUrl>[]>[]

  while (hasNextPage) {
    const url = getUrl({
      type,
      fields: ['link', 'modified'],
      pageSize: 99,
      page,
      image: true,
    })

    const response = await $fetch.raw(url)

    const parsed = SitemapSchema.safeParse(response._data)

    if (!parsed.success) {
      console.error(parsed.error.issues)
      throw parsed.error.issues
    }

    const totalPages = Number(response.headers.get('X-WP-TotalPages'))

    const items2 = <ReturnType<typeof asSitemapUrl>[]>parsed.data.map(
      (item) => {
        let image:
          | {
            loc: string
            caption: string
            title: string
          }
          | undefined = undefined

        if (item._embedded) {
          const featuredImages = item._embedded['wp:featuredmedia']

          const featuredImage = getFeaturedImage(featuredImages)

          if (featuredImage) {
            image = {
              loc: featuredImage.src,
              title: featuredImage.alt,
              caption: featuredImage.alt,
            }
          }
        }

        const prefix = type === 'posts' ? '/over-loesje/nieuws/' : '/'
        const loc = item.link.replace('https://shop.loesje.nl/', prefix)

        return {
          loc,
          modified: new Date(item.modified),
          images: image ? [image] : undefined,
        }
      },
    )
    hasNextPage = page < totalPages
    page = page + 1
    items.push(...items2)
  }
  return items
}
