<template>
  <div>
    <div class="page">
      <div class="wrapper">
        <h1>{{ title }}</h1>
        <transition-group name="list" tag="ul" class="list">
          <post-list-item
            v-for="post in posts.edges"
            :key="post.node.postId"
            :post="post"
            class="list-item"
          />
        </transition-group>
        <app-loader v-if="$apollo.loading" />
        <div v-else-if="posts.pageInfo.hasNextPage" class="button-wrapper">
          <app-button @click="showMore">
            Toon meer nieuwsartikelen
          </app-button>
        </div>
      </div>
    </div>
    <related-posters-container />
  </div>
</template>

<script>
import PostListItem from '@/components/Posts/PostListItem.vue'
import PostsQuery from '~/graphql/Posts.gql'
import AppButton from '@/components/Shared/AppButton.vue'
import AppLoader from '@/components/Shared/AppLoader.vue'

import PageQuery from '~/graphql/Page.gql'
import RelatedPostersContainer from '@/components/Posters/RelatedPosters/RelatedPostersContainer.vue'

export default {
  components: {
    PostListItem,
    AppButton,
    AppLoader,
    RelatedPostersContainer
  },
  data() {
    return {
      title: 'Nieuws',
      posts: {
        edges: []
      },
      poster: {
        edges: []
      },
      page: null
    }
  },
  methods: {
    showMore() {
      this.$apollo.queries.posts.fetchMore({
        variables: {
          after: this.posts.pageInfo.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.posts

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
  },

  apollo: {
    page: {
      query: PageQuery,
      variables: {
        uri: 'over-mij/nieuws'
      }
    },
    posts: {
      query: PostsQuery,
      variables: {
        first: 12
      }
    }
  },
  head() {
    return {
      title: this.page.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin block;
}

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  margin-bottom: 2em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  align-items: stretch;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(1em);
}

.list-item {
  padding-bottom: 2em;
  border-bottom: 2px solid var(--color-black);
  display: flex;
  flex-direction: column;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
