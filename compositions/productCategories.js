import { useQuery, useResult } from '@vue/apollo-composable'
import { useContext, computed } from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'

export default () => {
  const { result, error, loading } = useQuery(ProductCategoriesQuery)
  const productCategories = useResult(result)

  return {
    productCategories,
    error,
    loading,
  }
}

export const useCategory = () => {
  const { params } = useContext()

  const slug = computed(() =>
    params.value.slug2 ? params.value.slug2 : params.value.slug1,
  )
  const { result, error, loading, onError } = useQuery(ProductCategoryQuery, {
    slug,
  })

  const productCategory = useResult(result)

  return {
    productCategory,
    error,
    loading,
    onError,
  }
}
