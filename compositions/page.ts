import {
  useQuery,
  useResult,
  provideApolloClient,
} from '@vue/apollo-composable/dist'
import { useContext, useRoute } from '@nuxtjs/composition-api'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'
import useMeta from '~/compositions/useMeta'

export const useRelatedPages = (parentPageId: Number, notIn: Number) => {
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

export const usePageById = (id: number) => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

  const { setSEO } = useMeta()
  const { result, onResult, loading } = useQuery(PageByIdQuery, {
    id,
  })
  const page = useResult(result)

  onResult((queryResult) => {
    setSEO(queryResult.data.page.seo)
  })

  return {
    loading,
    page,
  }
}

export const usePageByUri = () => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

  const route = useRoute()

  const { setSEO } = useMeta()
  const { result, onResult, loading } = useQuery(PageByUriQuery, {
    uri: route.value.params.pathMatch,
  })
  const page = useResult(result)

  onResult((queryResult) => {
    setSEO(queryResult.data.page.seo)
  })

  return {
    loading,
    page,
  }
}
