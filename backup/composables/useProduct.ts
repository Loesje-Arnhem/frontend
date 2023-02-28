import { useQuery } from '@vue/apollo-composable'
import { computed } from '@nuxtjs/composition-api'
import ProductsQuery from '~/graphql/Products/Products.gql'

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
