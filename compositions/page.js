import {
  useQuery,
  useResult,
  useContext,
  computed,
} from '@vue/apollo-composable'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'

export const usePageById = (id) => {
  const { result, error, loading } = useQuery(PageByIdQuery, {
    id,
  })

  const page = useResult(result)

  return {
    page,
    error,
    loading,
  }
}

export const usePageByUri = () => {
  const { params } = useContext()
  const uri = computed(() => params.value.pathMatch)

  const { result, error, loading } = useQuery(PageByUriQuery, {
    uri,
  })

  const page = useResult(result)

  return {
    page,
    error,
    loading,
  }
}
