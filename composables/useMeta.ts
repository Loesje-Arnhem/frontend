import type { FeaturedImage } from '~/types/Content'

export const useMeta = ({
  title,
  description,
  image,
}: {
  title: string
  description?: string
  image?: FeaturedImage
}) => {
  useSeoMeta({
    title: () => title,
    ogTitle: () => title,
    description: () => description,
    ogDescription: () => description,
    ogType: () => 'article',
    ogImage: () => image?.src,
    ogImageHeight: () => image?.height,
    ogImageWidth: () => image?.width,
    ogImageAlt: () => image?.alt,
    twitterTitle: () => title,
    twitterDescription: () => description,
    twitterImage: () => image?.src,
  })

  useSchemaOrg([
    defineWebPage({
      description,
    }),
  ])
}
