<template>
  <shop-wrapper>
    <h1>{{ productCategory.name }}</h1>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <!-- eslint-enable vue/no-v-html -->
    <product-list-section :category="productCategory.databaseId" />
  </shop-wrapper>
</template>

<script>
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import ProductListSection from '~/components/Shop/Products/ProductList/ProductListSection.vue'
import ShopWrapper from '~/components/Shop/Layout/ShopWrapper.vue'

export default {
  components: {
    ProductListSection,
    ShopWrapper,
  },
  async asyncData({ app, params }) {
    const slug = params.slug2 ? params.slug2 : params.slug1
    const productCategory = await app.apolloProvider.defaultClient.query({
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
      nl: '/winkeltje/categorie/:slug1/:slug2?',
    },
  },

  head() {
    return {
      title: this.productCategory.name,
    }
  },
}
</script>
