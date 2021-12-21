import {
  useQuery,
  useResult,
  provideApolloClient,
} from '@vue/apollo-composable/dist'
import { useContext } from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import useMeta from '~/composables/useMeta'

export default () => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

  const { result, error, loading } = useQuery(ProductCategoriesQuery)
  const productCategories = useResult(result)

  return {
    productCategories,
    error,
    loading,
  }
}

export const useProductCategory = (slug: string) => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

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
