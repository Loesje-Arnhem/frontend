import { useQuery, useResult } from '@vue/apollo-composable'
import PosterQuery from '~/graphql/Posters/Posters.gql'

export default ({ first = 5 } = {}) => {
  const { result, error, loading } = useQuery(PosterQuery, {
    first,
  })

  const posters = useResult(result)

  return {
    posters,
    error,
    loading,
  }
}
