<template>
  <div>
    <h1>{{ productCategory.name }}</h1>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <!-- eslint-enable vue/no-v-html -->
    <product-list-section :category="productCategory.databaseId" />
  </div>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import ProductListSection from '~/components/Shop/ProductList/ProductListSection.vue'

export default {
  components: {
    ProductListSection,
  },
  async asyncData({ app, params }) {
    const productCategory = await app.apolloProvider.defaultClient.query({
      query: ProductCategoryQuery,
      variables: {
        slug: params.slug,
      },
    })

    return {
      productCategory: productCategory.data.productCategory,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:slug',
    },
  },
  head() {
    return {
      title: this.productCategory.name,
    }
  },
}
</script>
