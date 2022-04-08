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
  const { app } = useContext()
  const loading = ref(false)

  const route = useRoute()

  const slug = computed(() => {
    return route.value.params.subcategory || route.value.params.category
  })

  const productCategory = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: ProductCategoryQuery,
          variables: {
            slug: slug.value,
          },
        })
        return data.productCategory
      } finally {
        loading.value = false
      }
    },
    slug,
    'product-category',
  )

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
