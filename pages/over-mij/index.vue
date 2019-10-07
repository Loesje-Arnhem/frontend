<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div v-html="page.content" />
    </div>
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'

export default {
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: 'over-mij'
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
  @mixin block;
}

.intro {
  @mixin center var(--container-width-md);
  margin-bottom: 3em;
}
</style>
