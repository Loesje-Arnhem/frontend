<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: "/burgerschapsonderwijs",
  },
});
const { pageIds } = useAppConfig();

const { data } = await useFetch("/api/pages/page", {
  params: {
    id: pageIds.school,
  },
});

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useMeta({
  title: data.value.title,
  description: data.value.description,
});
</script>

<template>
  <div v-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <form-school />
    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
  </div>
</template>

<style scoped>
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
