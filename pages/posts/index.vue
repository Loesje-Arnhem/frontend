<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <posts-overview-section />
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { blogPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: blogPageId,
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
  nuxtI18n: {
    paths: {
      nl: '/informatie/nieuws',
    },
  },
}
</script>
