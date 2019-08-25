<template>
  <div class="store">
    <div class="wrapper">
      <nav aria-labelledby="categories-title">
        <h2 id="categories-title" class="sr-only">Categorien</h2>
        <ul class="categories">
          <li
            v-for="productCategory in productCategories.edges"
            :key="productCategory.node.id"
            class="list-item"
          >
            <nuxt-link :to="productCategory.node.slug" class="link">
              {{ productCategory.node.name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import ProductCategoriesQuery from '~/graphql/ProductCategories.gql'
import ProductsQuery from '~/graphql/Products.gql'
export default {
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
