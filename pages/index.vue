<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncGql('GetPageHome', {
  id: pageIds.home.toString(),
})

useMeta(data.value?.page)
</script>

<template>
  <div>
    <h1 v-if="data?.page" class="sr-only">
      {{ data.page?.title }}
    </h1>

    <why-donate />
    <latest-posts-section :posts="data?.posts" />

    <related-posters-section
      v-if="data?.page"
      :posters="data.page.relatedPosters"
      :title="data.page.relatedPostersGroup?.title"
    />
    <app-stores-section />
    <related-products-section :products="data?.page?.relatedProducts" />
  </div>
</template>
