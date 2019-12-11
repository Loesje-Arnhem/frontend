<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 20 }"
  >
    <template slot-scope="{ result: { data }, isLoading, query }">
      <posters-overview-section
        :data="data"
        :has-more="hasMore"
        :is-loading="isLoading > 0"
        @search="search"
        @loadMore="loadMore(query, data.posters.pageInfo.endCursor)"
      />
    </template>
  </apollo-query>
</template>

<script>
import PostersOverviewSection from '@/components/Posters/PostersOverview/PostersOverviewSection.vue'

export default {
  components: {
    PostersOverviewSection
  },
  data() {
    return {
      hasMore: true,
      searchTerm: 'voetbal'
    }
  },

  computed: {
    showMoreButton() {
      return this.hasPaging && this.hasMore
    }
  },

  methods: {
    search(term) {
      window.console.log(term)
      this.searchTerm = term
    },
    async loadMore(query, endCursor) {
      await query.fetchMore({
        variables: {
          after: endCursor
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          window.console.log(query)
          const newPosters = fetchMoreResult.posters

          if (!fetchMoreResult.posters.pageInfo.hasNextPage) {
            this.hasMore = false
          }

          return {
            posters: {
              __typename: previousResult.posters.__typename,
              pageInfo: newPosters.pageInfo,
              // Merging the tag list
              edges: [...previousResult.posters.edges, ...newPosters.edges]
            }
          }
        }
      })
    }
  }
}
</script>
