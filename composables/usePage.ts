import { useQuery, useResult } from '@vue/apollo-composable'
import { Ref } from '@nuxtjs/composition-api'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'
import useMeta from '~/composables/useMeta'
import { IPages } from '~/interfaces/IPages'
import { IPageDetail } from '~/interfaces/IPageDetail'

export const useRelatedPages = (parentPageId: Number, notIn: Number) => {
  const { result, error, loading, onError } = useQuery(RelatedPagesQuery, {
    notIn,
    parentPageId: parentPageId.toString(),
  })

  const relatedPages = useResult(result) as Ref<IPages>

  return {
    relatedPages,
    error,
    loading,
    onError,
  }
}

export const usePageById = (id: number) => {
  const { setSEO } = useMeta()
  const { result, onResult, loading } = useQuery(PageByIdQuery, {
    id,
  })
  const page = useResult(result) as Ref<IPageDetail>

  onResult((queryResult) => {
    setSEO(queryResult.data.page.seo)
  })

  return {
    loading,
    page,
  }
}

export const usePageByUri = (uri: string) => {
  const { setSEO } = useMeta()
  const { result, onResult, loading } = useQuery(PageByUriQuery, {
    uri,
  })
  const page = useResult(result) as Ref<IPageDetail>

  onResult((queryResult) => {
    setSEO(queryResult.data.page.seo)
  })

  return {
    loading,
    page,
  }
}
