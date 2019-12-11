<template>
  <apollo-query
    :query="require('~/graphql/Posts.gql')"
    :variables="{ first: total }"
  >
    <template slot-scope="{ result: { data, loading }, query }">
      <app-loader v-if="loading" />
      <template v-else>
        <ul :class="$style.list">
          <post-list-item
            v-for="post in data.posts.edges"
            :key="post.node.postId"
            :post="post"
            :class="$style['list-item']"
          />
        </ul>
        <app-button
          v-if="showMoreButton"
          @click="loadMore(query, data.posts.pageInfo.endCursor)"
        >
          Load more
        </app-button>
      </template>
    </template>
  </apollo-query>
</template>

<script>
import PostListItem from '@/components/Posts/PostListItem.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    PostListItem,
    AppLoader,
    AppButton
  },

  props: {
    total: {
      type: Number,
      default: 10
    },
    hasPaging: {
      type: Boolean,
      default: true
    }
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

<style lang="postcss" module>
.list {
  @mixin list-reset;
  margin-bottom: 2em;
}

.list-item {
  &:not(:last-child) {
    margin: 0 0 3em;
  }
}
</style>
