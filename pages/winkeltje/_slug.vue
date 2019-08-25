<template>
  <div class="product">
    <app-image :src="product.image.mediumLarge" />
    <div class="content">
      <h1>{{ product.name }}</h1>
      <!-- eslint-disable-next-line -->
      <div v-html="product.description"></div>
    </div>
  </div>
</template>

<script>
import ProductQuery from '~/graphql/Product.gql'
import AppImage from '@/components/Shared/AppImage.vue'
export default {
  components: {
    AppImage
  },

  data() {
    return {
      title: 'Winkeltje'
    }
  },
  async asyncData({ app, params }) {
    const product = await app.apolloProvider.defaultClient.query({
      query: ProductQuery,
      variables: {
        slug: params.slug
      }
    })

    return {
      product: product.data.product
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.product {
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
}
</style>
