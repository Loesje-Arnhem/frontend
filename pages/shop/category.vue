<template>
  <shop-wrapper>
    <template v-if="productCategory">
      <h1>{{ productCategory.name }}</h1>
      <p
        v-if="productCategory.description"
        v-html="productCategory.description"
      />
    </template>
    <product-list :where="{ category: slug }" />
  </shop-wrapper>
</template>

<script>
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'
import getSeoMetaData from '~/utils/seo'

export default defineComponent({
  setup() {
    const route = useRoute()
    const slug = computed(() => {
      return route.value.params.subcategory || route.value.params.category
    })
    return {
      slug,
    }
  },
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider

    const slug = params.subcategory ? params.subcategory : params.category

    const productCategory = await defaultClient.query({
      query: ProductCategoryQuery,
      variables: {
        slug,
      },
    })

    return {
      productCategory: productCategory.data.productCategory,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:category/:subcategory?',
    },
  },

  head() {
    return getSeoMetaData(this.productCategory.seo)
  },
})
</script>
