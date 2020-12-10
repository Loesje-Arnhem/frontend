import { useQuery, useResult } from '@vue/apollo-composable'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'

export default () => {
  const { result, error, loading } = useQuery(ProductCategoriesQuery)
  const productCategories = useResult(result)

  return {
    productCategories,
    error,
    loading,
  }
}
