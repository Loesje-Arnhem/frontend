import { useQuery, useResult } from '@vue/apollo-composable'
import { useContext, computed } from '@nuxtjs/composition-api'
import ProductQuery from '~/graphql/Products/Product.gql'

export default () => {
  const { params } = useContext()
  const slug = computed(() => params.value.slug)
  const { result, error, loading, onError } = useQuery(ProductQuery, {
    slug,
  })

  const product = useResult(result)

  return {
    product,
    error,
    loading,
    onError,
  }
}
