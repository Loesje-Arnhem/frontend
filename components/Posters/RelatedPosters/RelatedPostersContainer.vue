<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 5 }"
  >
    <template slot-scope="{ result: { data, loading } }">
      <app-loader v-if="loading" />
      <related-posters-section :posters="data.posters" />
    </template>
  </apollo-query>
</template>

<script>
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
    RelatedPostersSection
  },
  data() {
    return {
      hasMore: true
    }
  },

  computed: {
    showMoreButton() {
      return this.hasPaging && this.hasMore
    }
  },

  methods: {
    async loadMore(query, endCursor) {
      await query.fetchMore({
        variables: {
          after: endCursor
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          window.console.log(query)
          const newPosts = fetchMoreResult.posts

          if (!fetchMoreResult.posts.pageInfo.hasNextPage) {
            this.hasMore = false
          }

          return {
            posts: {
              __typename: previousResult.posts.__typename,
              pageInfo: newPosts.pageInfo,
              // Merging the tag list
              edges: [...previousResult.posts.edges, ...newPosts.edges]
            }
          }
        }
      })
    }
  }
}
</script>
