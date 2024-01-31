<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/winkeltje/[slug]',
  },
})

const route = useRoute()

const { data } = await useAsyncData(
  `product-${route.params.slug.toString()}}`,
  () =>
    $fetch('/api/products/product', {
      params: {
        slug: route.params.slug.toString(),
      },
    }),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

useMeta({
  title: data.value.title,
})
</script>

<template>
  <shop-wrapper v-if="data">
    <product-details :product="data" />
    <section aria-labelledby="featured-products">
      <h1 id="featured-products">Gerelateerde producten</h1>
      <product-list :product-ids="data.relatedProductIds" />
    </section>
  </shop-wrapper>
</template>
