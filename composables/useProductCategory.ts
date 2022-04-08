import { useQuery, useResult } from '@vue/apollo-composable'
import { useContext, useStatic, ref } from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import useMeta from '~/composables/useMeta'

export default () => {
  const { app } = useContext()
  const loading = ref(false)

  const productCategories = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: ProductCategoriesQuery,
        })
        return data.page
      } finally {
        loading.value = false
      }
    },
    undefined,
    'product-categories',
  )

  return {
    productCategories,
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
