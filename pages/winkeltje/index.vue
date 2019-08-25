<template>
  <div class="category">
    <ul class="list">
      <li
        v-for="product in products.edges"
        :key="product.node.id"
        class="list-item"
      >
        <nuxt-link :to="product.node.slug">
          {{ product.node.name }}
        </nuxt-link>
        {{ product.node.price }}
        {{ product.node.salePrice }}
        <app-image
          v-if="product.node.image"
          :src="product.node.image.medium"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ProductsQuery from '~/graphql/Products.gql'
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
    const products = await app.apolloProvider.defaultClient.query({
      query: ProductsQuery,
      variables: {
        categoryName: 'aanbieding'
      }
    })

    return {
      products: products.data.products
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
.list {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
