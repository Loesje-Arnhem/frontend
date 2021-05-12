<template>
  <shop-wrapper>
    <h1>{{ productCategory.name }}</h1>
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <product-list
      v-if="productCategory.products.edges.length"
      :products="productCategory.products.edges"
    />
  </shop-wrapper>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import getSeoMetaData from '~/utils/seo'

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

    return {
      productCategory: productCategory.data.productCategory,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:category/:subcategory?',
    },
  },

  head() {
    return getSeoMetaData(this.productCategory.seo)
  },
}
</script>
