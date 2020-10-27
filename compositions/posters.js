import { useQuery, useResult } from '@vue/apollo-composable'
import PostersQuery from '~/graphql/Posters/Posters.gql'
import PosterQuery from '~/graphql/Posters/Poster.gql'

export const setupWhere = ({
  subjects = [],
  sources = [],
  notIn = 0,
  posterIds = [],
  search = '',
}) => {
  if (posterIds.length) {
    return {
      in: posterIds,
    }
  }
  const taxQuery = {
    taxArray: [],
  }
  if (subjects.length) {
    taxQuery.taxArray.push({
      terms: subjects,
      taxonomy: 'SUBJECT',
      operator: 'IN',
    })
  }
  if (sources.length) {
    taxQuery.taxArray.push({
      terms: sources,
      taxonomy: 'SOURCE',
      operator: 'IN',
    })
  }
  return {
    notIn,
    search,
    taxQuery: taxQuery.taxArray.length ? taxQuery : null,
  }
}

export const usePosters = ({
  first = 20,
  search = null,
  notIn = 0,
  posterIds = [],
  subjects = [],
  sources = [],
} = {}) => {
  const { result, error, loading, fetchMore, refetch } = useQuery(
    PostersQuery,
    {
      first,
      where: setupWhere({ subjects, sources, notIn, posterIds, search }),
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
    refetch,
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
