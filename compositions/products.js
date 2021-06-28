import { useQuery, useResult } from '@vue/apollo-composable/dist'
import { computed } from '@nuxtjs/composition-api'
import ProductsQuery from '~/graphql/Products/Products.gql'

export default () => {
  const where = computed(() => {
    const inStock = {
      stockStatus: 'IN_STOCK',
    }

    if (this.databaseIds.length) {
      return {
        ...inStock,
        include: this.databaseIds,
      }
    }

    return {
      ...inStock,
      featured: true,
    }
  })
  const { result, error, loading, onError } = useQuery(ProductsQuery, {
    where,
  })

  const products = useResult(result)

  return {
    products,
    error,
    loading,
    onError,
  }
}
