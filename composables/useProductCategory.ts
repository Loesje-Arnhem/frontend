import { computed } from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import useFetch from '~/composables/useFetch'

export default () => {
  const { result, loading } = useFetch({
    query: ProductCategoriesQuery,
    pageKey: 'product-categories',
  })

  const productCategories = computed(() => result.value?.productCategories)

  return {
    productCategories,
    loading,
  }
}
