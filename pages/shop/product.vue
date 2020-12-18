<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-else-if="product">
      <product-details :product="product" />
      <product-list-section :related-products="product.related.edges" />
    </template>
  </shop-wrapper>
</template>

<script>
import { useContext, computed, useMeta } from '@nuxtjs/composition-api'
import ProductDetails from '~/components/Shop/Products/ProductDetails/ProductDetails.vue'
import ProductListSection from '~/components/Shop/Products/ProductList/ProductListSection.vue'
import ShopWrapper from '~/components/Shop/Layout/ShopWrapper.vue'
import useProducts from '~/compositions/products'

export default {
  components: {
    ShopWrapper,
    ProductDetails,
    ProductListSection,
  },
  setup() {
    const { error } = useContext()
    const { product, loading, onError } = useProducts()

    onError((err) => {
      error({ statusCode: 404, message: err.message })
    })

    useMeta({
      title: computed(() => product?.value?.title).value,
    })

    return {
      product,
      loading,
      error,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/:slug',
    },
  },
  head: {},
}
</script>
