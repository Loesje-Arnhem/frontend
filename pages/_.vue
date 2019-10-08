<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <posters :posters="posters" />
    <child-pages-list v-if="pages" :pages="pages" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'
import ChildPagesQuery from '~/graphql/ChildPages.gql'
import ChildPagesList from '@/components/Pages/ChildPagesList.vue'
import Posters from '@/components/Blocks/Posters.vue'
import PostersQuery from '~/graphql/Posters.gql'

export default {
  components: {
    ChildPagesList,
    Posters
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: params.pathMatch
      }
    })

    const response = page.data.page

    let pages = null
    if (response.parent) {
      pages = await app.apolloProvider.defaultClient.query({
        query: ChildPagesQuery,
        variables: {
          parent: response.parent.pageId,
          notIn: response.pageId
        }
      })
    }

    if (response.childPages && response.childPages.edges.length) {
      pages = await app.apolloProvider.defaultClient.query({
        query: ChildPagesQuery,
        variables: {
          parent: page.data.page.pageId
        }
      })
    }

    const posters = await app.apolloProvider.defaultClient.query({
      query: PostersQuery,
      variables: {
        first: 5
      }
    })
    return {
      page: response,
      pages: pages ? pages.data.pages : null,
      posters: posters.data.posters
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
