<template>
  <div>
    <section
      v-if="posts.edges && posts.edges.length"
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
        <app-button to="/nieuws" title="Meer nieuwsartikelen" />
      </div>

      <balloon />
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

  apollo: {
    // Pages
    posts: {
      query: PostsQuery,
      variables: {
        first: 5
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
  position: relative;
}

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  max-width: var(--container-width-md);
}
</style>
