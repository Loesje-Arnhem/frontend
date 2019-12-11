<template>
  <apollo-query
    :query="require('~/graphql/Posts.gql')"
    :variables="{ first: 12, notIn }"
  >
    <template slot-scope="{ result: { data }, isLoading, query }">
      <posts-overview-section
        :has-more="hasMore"
        :data="data"
        :is-loading="isLoading > 0"
        @loadMore="loadMore(query, data.posts.pageInfo.endCursor)"
      />
    </template>
  </apollo-query>
</template>

<script>
import PostsOverviewSection from '@/components/Posts/PostsOverview/PostsOverviewSection.vue'

export default {
  components: {
    PostsOverviewSection
  },

  props: {
    notIn: {
      type: Number,
      default: 0
    }
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
