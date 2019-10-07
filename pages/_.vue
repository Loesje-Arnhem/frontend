<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="page.content" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'

export default {
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: params.pathMatch
      }
    })

    return {
      page: page.data.page
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
.page {
  @mixin center var(--container-width-md);
  @mixin block;
}
</style>
