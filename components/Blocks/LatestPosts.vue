<template>
  <div>
    <section
      v-if="hasPosts"
      class="news-list"
      aria-labelledby="news-list-title"
    >
      <div class="wrapper">
        <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>
        <ul class="list">
          <app-post
            v-for="post in posts.edges"
            :key="post.postId"
            :post="post.node"
          />
        </ul>
        <app-button to="/nieuws">Meer nieuwsartikelen</app-button>
        <balloon />
      </div>
    </section>
  </div>
</template>

<script>
import AppPost from '@/components/AppPost.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import Balloon from '@/components/Illustrations/Balloon.vue'
import PostsQuery from '~/graphql/Posts.gql'

export default {
  components: {
    AppPost,
    Balloon,
    AppButton
  },

  data() {
    return {
      posts: null
    }
  },

  computed: {
    hasPosts() {
      return this.posts && this.posts.edges && this.posts.edges.length
    }
  },

  apollo: {
    // Pages
    posts: {
      query: PostsQuery,
      variables: {
        first: 3
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.news-list {
  @mixin block;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.wrapper {
  @mixin center var(--container-width-lg);
  position: relative;
}

.list {
  @mixin list-reset;
  margin-bottom: 2em;
  max-width: 42rem;
}
</style>
