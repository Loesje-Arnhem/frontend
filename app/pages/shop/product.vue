<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: "/winkeltje/[slug]",
  },
});

definePageMeta({
  middleware: ["cart"],
});

const route = useRoute();

const { data } = await useAsyncData(
  `product-${route.params.slug.toString()}}`,
  () =>
    $fetch("/api/products/product", {
      params: {
        slug: route.params.slug.toString(),
      },
    }),
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useMeta({
  title: data.value.title,
  description: data.value.excerpt,
});

defineProduct({
  name: data.value.title,
  offers: [{ price: data.value.price }],
  description: data.value.excerpt,
});
</script>

<template>
  <shop-wrapper v-if="data">
    <product-details :product="data" />
    <section v-if="data.relatedProductIds" aria-labelledby="featured-products">
      <h1 id="featured-products">Gerelateerde producten</h1>
      <product-list :product-ids="data.relatedProductIds" />
    </section>
  </shop-wrapper>
</template>
