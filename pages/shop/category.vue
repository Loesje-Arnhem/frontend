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

<script lang="ts">
import {
  defineComponent,
  useRoute,
  computed,
  useMeta,
} from '@nuxtjs/composition-api'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory'
import useFetch from '~/composables/useFetch'

export default defineComponent({
  setup() {
    const route = useRoute()

    const slug = computed(() => {
      return route.value.params.subcategory || route.value.params.category
    })

    const { result, loading } = useFetch({
      query: ProductCategoryQuery,
      usePayload: true,
      variables: {
        slug: slug.value,
      },
      params: slug,
      pageKey: 'product-category',
    })

    const productCategory = computed(() => result.value?.productCategory)

    const products = computed(() => {
      if (!productCategory.value) {
        return []
      }

      // @ts-ignore
      return productCategory.value.products.edges.map((product) => {
        let featuredImage = null
        if (product.featuredImage) {
          featuredImage = {
            node: product.featuredImage,
          }
        }
        return {
          ...product.node,
          featuredImage,
        }
      })
    })

    useMeta(() => ({ title: productCategory.value?.name }))

    return {
      productCategory,
      loading,
      products,
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
