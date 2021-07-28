<template>
  <div v-if="post">
    <app-content
      :image="post.featuredImage"
      :title="post.title"
      :content="post.content"
      :date="post.date"
      :video="post.videoGroup.youtubeId"
      :class="$style.content"
    />

    <related-posters-section :related-posters="post.relatedPosters" />
    <related-products-section :related-products="post.relatedProducts" />
    <posts-overview-section :not-in="post.databaseId" />
  </div>
</template>

<script>
import PostQuery from '~/graphql/Posts/Post.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PostQuery,
      variables: {
        slug: params.slug,
      },
    })
    return {
      post: result.data.post,
    }
  },
  head() {
    return getSeoMetaData(this.post.seo)
  },
  nuxtI18n: {
    paths: {
      nl: '/over-loesje/nieuws/:slug',
    },
  },
}
</script>

<style lang="postcss" module>
.content {
  @mixin block;
}
</style>
