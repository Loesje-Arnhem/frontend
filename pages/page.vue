<template>
  <div v-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-pages-section
      v-if="parentId"
      :not-in="page.databaseId"
      :parent-page-id="parentId"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'
import getSeoMetaData from '~/utils/seo'

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
    return getSeoMetaData(this.page.seo)
  },
  computed: {
    parentId() {
      return this.page.parentDatabaseId || this.page.databaseId
    },
  },

  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
})
</script>
