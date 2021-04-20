<template>
  <shop-wrapper>
    <h1>{{ productCategory.name }}</h1>
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <product-list v-if="products.edges.length" :products="products.edges" />
  </shop-wrapper>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import ProductsQuery from '~/graphql/Products/Products.gql'

export default {
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider

    const slug = params.subcategory ? params.subcategory : params.category

    const productCategory = await defaultClient.query({
      query: ProductCategoryQuery,
      variables: {
        slug,
      },
    })

    const products = await defaultClient.query({
      query: ProductsQuery,
      variables: {
        where: {
          categoryId: productCategory.data.productCategory.databaseId,
          stockStatus: 'IN_STOCK',
        },
      },
    })

    return {
      productCategory: productCategory.data.productCategory,
      products: products.data.products,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:category/:subcategory?',
    },
  },

  head() {
    return {
      title: this.productCategory.name,
    }
  },
}
</script>
