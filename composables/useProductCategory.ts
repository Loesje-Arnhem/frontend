import { useMeta, useRoute, computed } from '@nuxtjs/composition-api'
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory'
import useFetch from '~/composables/useFetch'

export default () => {
  const { result, loading } = useFetch({
    query: ProductCategoriesQuery,
    pageKey: 'product-categories',
  })

  const productCategories = computed(() => result.value?.productCategories)

  return {
    productCategories,
    loading,
  }
}

export const useProductCategory = () => {
  const route = useRoute()

  const slug = computed(() => {
    return route.value.params.subcategory || route.value.params.category
  })

  const { result, loading } = useFetch({
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
