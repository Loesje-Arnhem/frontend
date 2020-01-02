<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <form-workshop />
    <related-posters-container
      v-if="page"
      :related-posters="page.relatedPosters"
    />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'
import RelatedPostersContainer from '@/components/Posters/RelatedPosters/RelatedPostersContainer.vue'
import FormWorkshop from '@/components/Blocks/FormWorkshop.vue'

export default {
  components: {
    RelatedPostersContainer,
    FormWorkshop
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        uri: 'workshops'
      }
    })

    const response = page.data.page

    return {
      page: response
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
