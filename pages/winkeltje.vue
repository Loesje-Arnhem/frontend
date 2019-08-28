<template>
  <div class="store">
    <div class="wrapper">
      <category-list
        v-if="productCategories.edges"
        :product-categories="productCategories.edges"
      />
      <div>
        <nuxt-child />
        {{ cart }}
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/Shop/CategoryList.vue'

import ProductCategoriesQuery from '~/graphql/ProductCategories.gql'
import CartQuery from '~/graphql/Cart.gql'
export default {
  components: {
    CategoryList
  },
  data() {
    return {
      title: 'Winkeltje'
    }
  },
  async asyncData({ app, params }) {
    const categories = await app.apolloProvider.defaultClient.query({
      query: ProductCategoriesQuery
    })
    const cart = await app.apolloProvider.defaultClient.query({
      query: CartQuery
    })

    return {
      productCategories: categories.data.productCategories,
      cart: cart.data.cart
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
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr 3fr;
  align-items: start;
}

.categories {
  @mixin list-reset;
  padding: 1em;
  border: 0.3em solid var(--color-black);
  border-radius: 50% 4% 20% 1%/5% 50% 2% 45%;
  border-bottom-width: 0.5em;
  border-left-width: 0.5em;
}

.list-item {
  margin-bottom: 0.25em;
}
</style>
