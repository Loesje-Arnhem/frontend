<template>
  <apollo-query
    :query="require('~/graphql/Posts/Posts.gql')"
    :variables="{ first, notIn }"
  >
    <template v-slot="{ result: { data }, isLoading, query }">
      <template v-if="data">
        <slot v-if="data.posts.edges.length" :posts="data.posts.edges" />
        <load-more
          v-if="showMore"
          :title="btnMoreText"
          :state="state(data, isLoading)"
          @loadMore="loadMore(query, data)"
        />
      </template>
      <app-loader v-if="isLoading" />
    </template>
  </apollo-query>
</template>

<script>
import LoadMore from '~/components/LoadMore/LoadMoreByClick.vue'
import AppLoader from '~/components/Shared/AppLoader.vue'

export default {
  components: {
    AppLoader,
    LoadMore,
  },
  props: {
    showMore: {
      type: Boolean,
      default: false,
    },
    btnMoreText: {
      type: String,
      default: null,
    },
    notIn: {
      type: Number,
      default: 0,
    },
    first: {
      type: Number,
      default: 12,
    },
  },

  methods: {
    state(data, isLoading) {
      if (!data.posts.pageInfo.hasNextPage) {
        return 'complete'
      } else if (isLoading > 0) {
        return 'loading'
      }
      return 'loaded'
    },
    async loadMore(query, data) {
      const { endCursor } = data.posts.pageInfo
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
