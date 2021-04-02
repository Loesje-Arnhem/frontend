import { useQuery, useResult } from '@vue/apollo-composable/dist'
import { useContext, computed } from '@nuxtjs/composition-api'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'

export const usePageById = (id) => {
  const { result, error, loading, onError } = useQuery(PageByIdQuery, {
    id,
  })

  const page = useResult(result)

  return {
    page,
    error,
    loading,
    onError,
  }
}

export const usePageByUri = () => {
  const { params } = useContext()
  const uri = computed(() => params.value.pathMatch)
  const { result, error, loading, onError } = useQuery(PageByUriQuery, {
    uri,
  })

  const page = useResult(result)

  return {
    page,
    error,
    loading,
    onError,
  }
}
