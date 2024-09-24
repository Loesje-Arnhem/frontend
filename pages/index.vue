<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: "/",
  },
});

const { pageIds } = useAppConfig();

const { data } = await useAsyncData(`page-home`, () =>
  $fetch("/api/pages/page", {
    params: {
      id: pageIds.home,
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
  title: "Blijf plakken",
  description: data.value.description,
});
</script>

<template>
  <div>
    <h1 v-if="data" class="sr-only">
      {{ data.title }}
    </h1>

    <latest-posts-section />
    <related-posters-section
      v-if="data"
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
    <app-stores-section />
    <related-products-section
      v-if="data?.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
  </div>
</template>
