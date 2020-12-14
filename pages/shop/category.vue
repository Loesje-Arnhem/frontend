<template>
  <shop-wrapper>
    <template v-if="productCategory">
      <h1>{{ productCategory.name }}</h1>
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="productCategory.description"
        v-html="productCategory.description"
      />
      <!-- eslint-enable vue/no-v-html -->
      <product-list
        v-if="productCategory.products"
        :products="productCategory.products.edges"
      />
    </template>
  </shop-wrapper>
</template>

<script>
import {
  useStatic,
  useContext,
  computed,
  defineComponent,
  useMeta,
} from '@nuxtjs/composition-api'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'

export default defineComponent({
  setup() {
    const { params, app } = useContext()
    const slug = computed(() =>
      params.value.slug2 ? params.value.slug2 : params.value.slug1,
    )
    const result = useStatic(
      (slug) =>
        app.apolloProvider.defaultClient.query({
          query: ProductCategoryQuery,
          variables: {
            slug,
          },
        }),
      slug,
      'category',
    )
    const productCategory = computed(() => result.value?.data?.productCategory)

    useMeta(() => ({ title: productCategory.value?.name }))

    return {
      result,
      productCategory,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:slug1/:slug2?',
    },
  },
  head: {},

  // head() {
  //   return {
  //     title: this.productCategory.name,
  //   }
  // },
})
</script>
