<template>
  <div class="store">
    <div class="wrapper">
      <ul class="list">
        <li
          v-for="productCategory in productCategories.edges"
          :key="productCategory.node.id"
          class="list-item"
        >
          <nuxt-link :to="productCategory.node.slug">
            {{ productCategory.node.name }}
          </nuxt-link>
        </li>
      </ul>
      <ul class="list">
        <li
          v-for="product in products.edges"
          :key="product.node.id"
          class="list-item"
        >
          {{ product.node.name }}
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
  </div>
</template>

<script>
import ProductCategoriesQuery from '~/graphql/ProductCategories.gql'
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
    const categories = await app.apolloProvider.defaultClient.query({
      query: ProductCategoriesQuery
    })

    return {
      products: products.data.products,
      productCategories: categories.data.productCategories
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
.store {
  @mixin block;
}

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
