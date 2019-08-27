<template>
  <section class="news-list" aria-labelledby="news-list-title">
    <div class="wrapper">
      <h1 id="news-list-title">{{ $t('latestPosts') }}</h1>
      <ul v-if="posts.edges.length" class="list">
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
