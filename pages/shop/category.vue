<template>
  <shop-wrapper>
    {{ productCategory }}
    <h1>{{ productCategory.name }}</h1>
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="productCategory.description"
      v-html="productCategory.description"
    />
    <!-- eslint-enable vue/no-v-html -->
    <product-list-section :category="productCategory.databaseId" />
  </shop-wrapper>
</template>

<script>
import { useContext, useAsync } from '@nuxtjs/composition-api'
import ProductCategoryQuery from '~/graphql/ProductCategories/ProductCategory.gql'

export default {
  setup() {
    const { params, app } = useContext()

    const productCategory = useAsync(() => {
      return app.apolloProvider.defaultClient.query({
        query: ProductCategoryQuery,
        variables: {
          slug: params.value.slug2 ? params.value.slug2 : params.value.slug1,
        },
      })
    })
    return {
      productCategory,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:slug1/:slug2?',
    },
  },

  head() {
    return {
      title: this.productCategory.name,
    }
  },
}
</script>
