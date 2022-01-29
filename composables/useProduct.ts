import {
  useQuery,
  useResult,
  provideApolloClient,
} from '@vue/apollo-composable/dist'
import { useContext } from '@nuxtjs/composition-api'
import ProductsQuery from '~/graphql/Products/Products.gql'
import ProductQuery from '~/graphql/Products/Product.gql'
import useMeta from '~/composables/useMeta'

export default (where = {}, size = 99) => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

  const { result, error, loading } = useQuery(ProductsQuery, {
    where: {
      stockStatus: 'IN_STOCK',
      ...where,
    },
    first: size,
  })

  const products = useResult(result)

  return {
    products,
    error,
    loading,
  }
}

export const useProduct = (slug: string) => {
  const { app } = useContext()
  provideApolloClient(app.apolloProvider?.defaultClient)

  const { setSEO } = useMeta()
  const { result, error, loading, onResult } = useQuery(ProductQuery, {
    slug,
  })

  const product = useResult(result)

  onResult((queryResult) => {
    setSEO(queryResult.data.product.seo)
  })

  return {
    product,
    error,
    loading,
  }
}