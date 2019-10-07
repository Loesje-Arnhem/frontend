<template>
  <div>
    <article class="post">
      <h1>{{ post.title }}</h1>
      <post-date :date="post.date" class="date" />
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="post.content" />
    </article>
    <latest-posts />
  </div>
</template>

<script>
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import PostDate from '@/components/PostDate.vue'
import PostQuery from '~/graphql/Post.gql'

export default {
  components: {
    PostDate,
    LatestPosts
  },

  async asyncData({ app, params }) {
    const post = await app.apolloProvider.defaultClient.query({
      query: PostQuery,
      variables: {
        uri: params.slug
      }
    })

    return {
      post: post.data.post
    }
  },
  head() {
    return {
      title: this.post.title
    }
  }
}
</script>

<style lang="postcss" scoped>
.date {
  font-size: 0.9em;
  color: var(--color-gray);
  display: block;
  order: -1;
}

.post {
  @mixin block;
  @mixin center var(--container-width-md);

  display: flex;
  flex-direction: column;
}
</style>
