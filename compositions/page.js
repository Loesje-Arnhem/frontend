import { useQuery, useResult } from '@vue/apollo-composable'
import PageQuery from '~/graphql/Pages/PageById.gql'

export default (id) => {
  const { result, error, loading } = useQuery(PageQuery, {
    id,
  })

  const page = useResult(result)

  return {
    page,
    error,
    loading,
  }
}
