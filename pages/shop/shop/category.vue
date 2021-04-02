<template>
  <shop-wrapper>
    <template v-if="productCategory">
      <h1>{{ productCategory.name }}</h1>
      <p
        v-if="productCategory.description"
        v-html="productCategory.description"
      />
      <product-list
        v-if="productCategory.products"
        :products="productCategory.products.edges"
      />
    </template>
  </shop-wrapper>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'

export default {
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider
    const slug = params.slug2 ? params.slug2 : params.slug1
    const result = await defaultClient.query({
      query: ProductCategoryQuery,
      variables: {
        slug,
      },
    })
    return {
      productCategory: result.data.productCategory,
    }
  },
  head() {
    return {
      title: this.productCategory.name,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:slug1/:slug2?',
    },
  },
}
</script>
