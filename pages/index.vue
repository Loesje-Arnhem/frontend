<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <latest-posts-section :posts="posts" />
    <lazy-related-posters-section :related-posters="page.relatedPosters" />
    <lazy-app-stores-section />
    <lazy-related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
      :size="2"
    />
    <!-- <block-instagram /> -->
    <lazy-groups />
  </div>
</template>

<script>
import { homePageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PostsQuery from '~/graphql/Posts/Posts.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const page = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: homePageId,
      },
    })
    const posts = await defaultClient.query({
      query: PostsQuery,
      variables: {
        first: 3,
      },
    })
    return {
      page: page.data.page,
      posts: posts.data.posts,
    }
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
}
</script>
