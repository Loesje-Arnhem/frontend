<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: "/winkeltje/categorie/[category]/[[subcategory]]",
  },
});

definePageMeta({
  middleware: ["cart"],
});

const route = useRoute();

const { data } = await useAsyncData(
  `product-category-${route.params.category.toString()}-${route.params.subcategory.toString()}`,
  () =>
    $fetch("/api/product-categories/product-category", {
      params: {
        slug:
          route.params.subcategory.toString() ||
          route.params.category.toString(),
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
});
</script>

<template>
  <shop-wrapper v-if="data">
    <div>
      <h1 v-html="data.title" />
      <p v-if="data.content" v-html="data.content" />
    </div>

    <product-list :category-id="data.id" />
  </shop-wrapper>
</template>
