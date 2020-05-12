<template>
  <div class="page">
    <div class="intro">
      <h1>{{ page.title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="page.content" />
    </div>
    <form-workshop />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Pages/PageById.gql'
import { workshopsPageId } from '~/data/pages'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import FormWorkshop from '~/components/Blocks/FormWorkshop.vue'
import RelatedProductsSection from '~/components/Shop/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    RelatedPostersSection,
    FormWorkshop,
    RelatedProductsSection,
  },

  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        id: workshopsPageId,
      },
    })

    return {
      page: page.data.page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>

<style scoped lang="postcss">
.intro {
  @mixin center var(--container-width-md);
  @mixin block;
}
</style>
