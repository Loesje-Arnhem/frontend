import {
  type PageDetailsFragment,
  type PostDetailsFragment,
  type PosterDetailsFragment,
  type ProductCategoryFragment,
} from '~/types/__generated__/graphql'

export const useMeta = (
  content?:
    | PageDetailsFragment
    | PostDetailsFragment
    | PosterDetailsFragment
    | ProductCategoryFragment
    | null,
) => {
  const { baseUrl } = useAppConfig()
  const { fullPath } = useRoute()

  if (!content) {
    return
  }

  useServerSeoMeta({
    ogUrl: () => `${baseUrl}${fullPath}`,
    ogTitle: () => content.seo?.title,
    description: () => content.seo?.metaDesc,
    ogDescription: () => content.seo?.metaDesc,
    ogType: () => 'article',
    ogImage: () => content.featuredImage?.node.src,
    twitterTitle: () => content.seo?.title,
    twitterDescription: () => content.seo?.metaDesc,
    twitterImage: () => content.featuredImage?.node.src,
  })
}
