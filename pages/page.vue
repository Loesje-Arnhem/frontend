<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentId"
    />
  </div>
</template>

<script>
import RelatedPagesSection from '@/components/Pages/RelatedPages/RelatedPagesSection.vue'
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import PageQuery from '~/graphql/Pages/Page.gql'

export default {
  components: {
    RelatedPagesSection,
    RelatedPostersSection,
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: params.pathMatch,
      },
    })

    return {
      page: page.data.page,
    }
  },
  computed: {
    parentId() {
      if (this.page.parent) {
        return this.page.parent.databaseId
      }
      return this.page.databaseId
    },
  },
  head() {
    return {
      title: this.page.title,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
}
</script>

<style scoped lang="postcss">
.intro {
  @mixin center var(--container-width-md);
  @mixin block;
}
</style>
