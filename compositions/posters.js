import { useQuery, useResult } from '@vue/apollo-composable'
import PosterQuery from '~/graphql/Posters/Posters.gql'

export default ({
  first = 5,
  search = null,
  notIn = 0,
  subjects = [],
  sources = [],
  posterIds = [],
} = {}) => {
  const where = () => {
    if (posterIds.length) {
      return {
        in: posterIds,
      }
    }
    let taxQuery = null
    if (subjects.length) {
      taxQuery = {
        taxArray: [
          {
            terms: subjects,
            taxonomy: 'SUBJECT',
            operator: 'IN',
          },
        ],
      }
    }
    if (sources.length) {
      taxQuery = {
        taxArray: [
          {
            terms: sources,
            taxonomy: 'SOURCE',
            operator: 'IN',
          },
        ],
      }
    }
    return {
      notIn: [notIn],
      search,
      taxQuery,
    }
  }

  const { result, error, loading } = useQuery(PosterQuery, {
    first,
    where: where(),
  })

  const posters = useResult(result)

  return {
    posters,
    error,
    loading,
  }
}
