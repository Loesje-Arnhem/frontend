<script setup lang="ts">
import { GetProduct } from '~/graphql/products'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/[slug]',
  },
})

const route = useRoute()

const { data } = await useAsyncQuery(GetProduct, {
  slug: route.params.slug as string,
})

const productIds = computed(() => {
  const products =
    data.value.product?.related?.edges.filter(
      (product) => product.node.databaseId,
    ) || []
  return products.map((product) => product?.node.databaseId)
})

useMeta(data.value.product)
</script>

<template>
  <shop-wrapper>
    <product-details v-if="data.product" :product="data.product" />
    <section aria-labelledby="featured-products">
      <h1 id="featured-products">Gerelateerde producten</h1>
      <product-list :product-ids="productIds" />
    </section>
  </shop-wrapper>
</template>
