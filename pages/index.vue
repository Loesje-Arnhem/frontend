<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <latest-posts-section />
    <related-posters-section :related-posters="page.relatedPosters" />
    <app-stores-section />
    <related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <block-instagram />
    <groups />
  </div>
</template>

<script>
import { homePageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: homePageId,
      },
    })
    return {
      page: result.data.page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
