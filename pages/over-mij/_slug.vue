<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <child-pages-list :pages="pages" :parent="page.slug" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'
import ChildPagesQuery from '~/graphql/ChildPages.gql'
import ChildPagesList from '@/components/Pages/ChildPagesList.vue'

export default {
  components: {
    ChildPagesList
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: `over-mij/${params.slug}`
      }
    })
    const pages = await app.apolloProvider.defaultClient.query({
      query: ChildPagesQuery,
      variables: {
        parent: page.data.page.parent.pageId,
        notIn: page.data.page.pageId
      }
    })
    return {
      page: page.data.page,
      pages: pages.data.pages
    }
  },
  head() {
    return {
      title: this.page.title
    }
  }
}
</script>

<style scoped lang="postcss">
.intro {
  @mixin center var(--container-width-md);
  @mixin block;
}
</style>
