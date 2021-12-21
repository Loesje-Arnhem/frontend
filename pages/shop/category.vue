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
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import { useProductCategory } from '~/composables/useProductCategory'

export default defineComponent({
  setup() {
    const route = useRoute()
    const slug = computed(() => {
      return route.value.params.subcategory || route.value.params.category
    })
    const { productCategory, loading } = useProductCategory(slug.value)

    return {
      slug,
      productCategory,
      loading,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/winkeltje/categorie/:category/:subcategory?',
    },
  },
  head: {},
})
</script>
