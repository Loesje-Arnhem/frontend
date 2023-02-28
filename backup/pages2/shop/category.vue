<template>
  <shop-wrapper>
    <app-loader v-if="loading" />
    <template v-else-if="productCategory">
      <h1>{{ productCategory.title }}</h1>
      <p
        v-if="productCategory.description"
        v-html="productCategory.description"
      />
      <product-list :products="productCategory.products" />
    </template>
  </shop-wrapper>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  computed,
  ComputedRef,
} from '@nuxtjs/composition-api'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory'
import useFetch from '~/composables/useFetch'
import useMeta from '~/composables/useMeta'
import { IProductCategory } from '~/interfaces/IProductCategory'

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

    const productCategory: ComputedRef<IProductCategory | null> = computed(
      () => {
        return result.value?.productCategory
      },
    )

    useMeta(productCategory)

    return {
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
