<template>
  <div>
    <h1>{{ productCategory.name }}</h1>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
export default {
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

  data() {
    return {
      title: 'Winkeltje',
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
