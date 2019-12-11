<template>
  <apollo-query
    :query="require('~/graphql/Posts.gql')"
    :variables="{ first: 3 }"
  >
    <template slot-scope="{ result: { data, loading } }">
      <app-loader v-if="loading" />
      <latest-posts-section :posts="data.posts" />
    </template>
  </apollo-query>
</template>

<script>
import AppLoader from '@/components/Shared/AppLoader.vue'
import LatestPostsSection from '@/components/Posts/LatestPosts/LatestPostsSection.vue'

export default {
  components: {
    AppLoader,
    LatestPostsSection
  },

  data() {
    return {
      hasMore: true
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
