<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-else-if="productCategory">
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
import { useCategory } from '~/compositions/productCategories'
import { workshopsPageId } from '~/data/pages'

export default {
  setup() {
    const { productCategory, loading, error } = useCategory(workshopsPageId)

    return {
      productCategory,
      loading,
      error,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:slug1/:slug2?',
    },
  },
  head: {},
}
</script>
