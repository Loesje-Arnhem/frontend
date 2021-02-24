<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <posts-overview-section />
    <!-- <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    /> -->
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { blogPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const page = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: blogPageId,
      },
    })
    return {
      page: page.data.page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws',
    },
  },
}
</script>
