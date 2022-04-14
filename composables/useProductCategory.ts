import {
  useMeta,
  useContext,
  useStatic,
  ref,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory'
import useFetch from '~/composables/useFetch'

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
        return data.productCategories
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

export const useProductCategory = () => {
  const loading = ref(false)

  const route = useRoute()

  const slug = computed(() => {
    return route.value.params.subcategory || route.value.params.category
  })

  const { result } = useFetch({
    query: ProductCategoryQuery,
    usePayload: true,
    variables: {
      slug: slug.value,
    },
    params: slug,
    pageKey: 'product-category',
  })

  const productCategory = computed(() => result.value?.productCategory)

  const products = computed(() => {
    if (!productCategory.value) {
      return []
    }

    // @ts-ignore
    return productCategory.value.products.edges.map((product) => {
      return {
        ...product.node,
      }
    })
  })

  useMeta(() => ({ title: productCategory.value?.name }))

  return {
    productCategory,
    loading,
    products,
  }
}
