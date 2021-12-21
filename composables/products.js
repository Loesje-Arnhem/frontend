import { computed } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable/dist'
import ProductsQuery from '~/graphql/Products/Products.gql'

export default (databaseIds, size) => {
  const include = computed(() => {
    if (databaseIds.length) {
      return {
        include: databaseIds,
      }
    }
    return {
      featured: true,
    }
  })
  const { result, error, loading, onError } = useQuery(ProductsQuery, {
    where: {
      stockStatus: 'IN_STOCK',
      ...include.value,
    },
    first: size,
  })

  const products = useResult(result)

  return {
    products,
    error,
    loading,
    onError,
  }
}
