<template>
  <div class="store">
    <div class="wrapper">
      <category-list
        v-if="productCategories.edges"
        :product-categories="productCategories.edges"
      />
      <div>
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/Shop/CategoryList.vue'
import ProductCategoriesQuery from '~/graphql/ProductCategories.gql'

export default {
  components: {
    CategoryList,
  },
  async asyncData({ app, params }) {
    const categories = await app.apolloProvider.defaultClient.query({
      query: ProductCategoriesQuery,
    })

    return {
      productCategories: categories.data.productCategories,
    }
  },
  data() {
    return {
      title: 'Winkeltje',
    }
  },

  head() {
    return {
      title: this.title,
    }
  },
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
</style>
