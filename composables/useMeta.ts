import { PageDetailsFragment, PostDetailsFragment, PosterDetailsFragment } from '#gql'

export const useMeta = (
  content?: PageDetailsFragment | PostDetailsFragment | PosterDetailsFragment | null,
) => {
  if (!content) {
    return
  }

  const schema = () => {
    if (!content.seo?.schema?.raw) {
      return null
    }
    const schemaWithBaseUrl = content.seo.schema.raw.replaceAll('shop.', 'www.')
    const schemaWithBaseUrlAndImages = schemaWithBaseUrl.replaceAll(
      'www.loesje.nl/wp-content',
      'shop.loesje.nl/wp-content',
    )
    return JSON.parse(schemaWithBaseUrlAndImages)
  }

  useServerSeoMeta({
    ogUrl: () => content.seo?.opengraphUrl?.replaceAll('shop.', 'www.'),
    ogTitle: () => content.seo?.title,
    description: () => content.seo?.metaDesc,
    ogDescription: () => content.seo?.metaDesc,
    ogType: () => "article",
    ogImage: () => content.featuredImage?.node.src,
    twitterTitle: () => content.seo?.title,
    twitterDescription: () => content.seo?.metaDesc,
    twitterImage: () => content.featuredImage?.node.src
  })

  useHead({
    title: content.seo?.title,
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema()),
      },
    ],
  })
}
