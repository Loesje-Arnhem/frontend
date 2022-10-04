import { useQuery } from '@vue/apollo-composable'
import { computed } from '@nuxtjs/composition-api'
import ProductsQuery from '~/graphql/Products/Products.gql'
import ProductQuery from '~/graphql/Products/Product.gql'
import useFetch from '~/composables/useFetch'

export default (where = {}, size = 99) => {
  const { result, error, loading } = useQuery(ProductsQuery, {
    where: {
      stockStatus: 'IN_STOCK',
      ...where,
    },
    first: size,
  })

  const products = computed(() => result.value.products)

  return {
    products,
    error,
    loading,
  }
}

export const useProduct = (slug: string) => {
  const params = computed(() => slug)

  const { result, loading } = useFetch({
    query: ProductQuery,
    variables: {
      slug,
    },
    params,
    pageKey: 'product',
  })
  const product = computed(() => result.value.product)

  return {
    product,
    loading,
  }
}
