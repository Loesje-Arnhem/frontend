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
  const { baseUrl } = useAppConfig()
  const { fullPath } = useRoute()

  useSeoMeta({
    title: () => title,
    ogUrl: () => `${baseUrl}${fullPath}`,
    ogTitle: () => title,
    description: () => description,
    ogDescription: () => description,
    ogType: () => 'article',
    ogImage: () => image?.src,
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
