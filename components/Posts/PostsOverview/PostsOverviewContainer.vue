<template>
  <apollo-query
    :query="require('~/graphql/Posts/Posts.gql')"
    :variables="{ first: 12, where: { notIn } }"
  >
    <template v-slot="{ result: { data }, isLoading, query }">
      <slot
        :posts="data.posts.edges"
        :loading="isLoading > 0"
        :has-more="data.posts.pageInfo.hasNextPage && isLoading === 0"
      />
      <load-more
        :loading="isLoading > 0"
        @loadMore="loadMore(query, data.posts.pageInfo.endCursor)"
      />
    </template>
  </apollo-query>
</template>

<script>
import LoadMore from '~/components/Shared/LoadMore.vue'

export default {
  components: {
    LoadMore,
  },
  props: {
    notIn: {
      type: Number,
      default: 0,
    },
    first: {
      type: Number,
      default: 20,
    },
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
