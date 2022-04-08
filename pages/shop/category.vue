<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-else-if="productCategory">
      <h1>{{ productCategory.name }}</h1>
      <p
        v-if="productCategory.description"
        v-html="productCategory.description"
      />
      <product-list :products="products" />
    </template>
  </shop-wrapper>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useProductCategory } from '~/composables/useProductCategory'

export default defineComponent({
  setup() {
    const { productCategory, loading, products } = useProductCategory()

    return {
      products,
      productCategory,
      loading,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:category/:subcategory?',
    },
  },
  head: {},
})
</script>
