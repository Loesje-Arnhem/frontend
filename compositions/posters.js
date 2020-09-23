import { useQuery, useResult } from '@vue/apollo-composable'
import PostersQuery from '~/graphql/Posters/Posters.gql'
import PosterQuery from '~/graphql/Posters/Poster.gql'

export default ({
  first = 20,
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

  const { result, error, loading, fetchMore } = useQuery(
    PostersQuery,
    {
      first,
      where: where(),
    },
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const posters = useResult(result)

  const loadMore = async () => {
    const { endCursor } = posters.value.pageInfo
    await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          posters: {
            ...previousResult.posters,
            pageInfo: fetchMoreResult.posters.pageInfo,
            edges: [
              ...previousResult.posters.edges,
              ...fetchMoreResult.posters.edges,
            ],
          },
        }
      },
    })
  }

  return {
    posters,
    error,
    loading,
    loadMore,
  }
}

export const usePoster = (slug) => {
  const { result, error, loading } = useQuery(PosterQuery, {
    slug,
  })

  const poster = useResult(result)

  return {
    poster,
    error,
    loading,
  }
}
