import { useQuery, useResult } from '@vue/apollo-composable'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import useMeta from '~/composables/useMeta'

export default () => {
  const { result, error, loading } = useQuery(ProductCategoriesQuery)
  const productCategories = useResult(result)

  return {
    productCategories,
    error,
    loading,
  }
}

export const useProductCategory = (slug: string) => {
  const { setSEO } = useMeta()
  const { result, error, loading, onResult } = useQuery(ProductCategoryQuery, {
    slug,
  })

  const productCategory = useResult(result)

  onResult((queryResult) => {
    setSEO(queryResult.data.productCategory.seo)
  })

  return {
    productCategory,
    error,
    loading,
  }
}
