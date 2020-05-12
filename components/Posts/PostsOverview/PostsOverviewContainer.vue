<template>
  <apollo-query
    :query="require('~/graphql/Posts/Posts.gql')"
    :variables="{ first: 12, where: { notIn } }"
  >
    <template v-slot="{ result: { data }, isLoading, query }">
      <posts-overview-section
        :data="data"
        :has-more="hasMore"
        :is-related="notIn > 0"
        :is-loading="isLoading > 0"
        @loadMore="loadMore(query, data.posts.pageInfo.endCursor)"
      />
    </template>
  </apollo-query>
</template>

<script>
import PostsOverviewSection from '~/components/Posts/PostsOverview/PostsOverviewSection.vue'

export default {
  components: {
    PostsOverviewSection,
  },

  props: {
    notIn: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      hasMore: true,
    }
  },

  methods: {
    async loadMore(query, endCursor) {
      await query.fetchMore({
        variables: {
          after: endCursor,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.posts

          if (!fetchMoreResult.posts.pageInfo.hasNextPage) {
            this.hasMore = false
          }

          return {
            posts: {
              __typename: previousResult.posts.__typename,
              pageInfo: newPosts.pageInfo,
              // Merging the tag list
              edges: [...previousResult.posts.edges, ...newPosts.edges],
            },
          }
        },
      })
    },
  },
}
</script>
