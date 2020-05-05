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
    <child-pages-list v-if="pages" :pages="pages" />
  </div>
</template>

<script>
import ChildPagesList from '@/components/Pages/ChildPagesList.vue'
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import PageQuery from '~/graphql/Pages/Page.gql'
import ChildPagesQuery from '~/graphql/Pages/ChildPages.gql'

export default {
  components: {
    ChildPagesList,
    RelatedPostersSection,
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: params.pathMatch,
      },
    })

    const response = page.data.page

    let pages = null
    if (response.parent) {
      pages = await app.apolloProvider.defaultClient.query({
        query: ChildPagesQuery,
        variables: {
          parent: response.parent.pageId,
          notIn: response.pageId,
        },
      })
    }

    if (response.childPages && response.childPages.edges.length) {
      pages = await app.apolloProvider.defaultClient.query({
        query: ChildPagesQuery,
        variables: {
          parent: page.data.page.pageId,
        },
      })
    }

    return {
      page: response,
      pages: pages ? pages.data.pages : null,
    }
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
