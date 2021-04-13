<template>
  <div v-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />
    <!-- <related-posters-section :related-posters="page.relatedPosters" />
    <related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentId"
    />
    <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'

export default defineComponent({
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PageByUriQuery,
      variables: {
        uri: params.pathMatch,
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
  computed: {
    parentId() {
      if (this.page.parent) {
        return this.page.parent.node.databaseId
      }
      return this.page.databaseId
    },
  },

  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
})
</script>
