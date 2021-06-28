import { useQuery, useResult } from '@vue/apollo-composable/dist'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'

export const useRelatedPages = (parentPageId, notIn) => {
  const { result, error, loading, onError } = useQuery(RelatedPagesQuery, {
    notIn,
    parentPageId: parentPageId.toString(),
  })

  const relatedPages = useResult(result)

  return {
    relatedPages,
    error,
    loading,
    onError,
  }
}
