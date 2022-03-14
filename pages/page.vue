<template>
  <div v-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <related-posters-section :related-posters="page.relatedPosters" />
    <lazy-related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <lazy-related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentPageId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'

export default defineComponent({
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: PageByUriQuery,
      variables: {
        uri: route.params.pathMatch,
      },
    })
    const page = data.page

    const parentPageId = page.parentDatabaseId || page.databaseId
    return {
      parentPageId,
      page,
    }
  },
  head: {},

  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
})
</script>
