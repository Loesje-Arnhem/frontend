<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: "/[...slug]",
  },
});

const route = useRoute();

const uri = computed(() => {
  if (Array.isArray(route.params.slug)) {
    const slugs = route.params.slug.filter((slug) => slug !== "");
    return slugs.at(-1) ?? "";
  } else {
    return route.params.slug;
  }
});

const { data } = await useFetch("/api/pages/page", {
  params: {
    slug: uri.value,
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
  image: data.value.featuredImage,
});

const relatedPagesParentId = computed(() => {
  if (!data.value) {
    return 0;
  }
  if (data.value.parentId) {
    return data.value?.parentId;
  }
  return data.value.id;
});
</script>

<template>
  <div v-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <btn-club-collect v-if="data.clubCollect" v-bind="data.clubCollect" />
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
    <related-pages-section
      v-if="relatedPagesParentId"
      :exclude="data.id"
      :parent-id="relatedPagesParentId"
    />
    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
  </div>
</template>
