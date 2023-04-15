<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws',
  },
})

const { pageIds } = useAppConfig()

const { data, pending } = await usePageById(pageIds.posts)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data?.page">
    <h1 class="sr-only">
      {{ data.page.title }}
    </h1>
    <posts-overview-section />
    <related-posters-section :posters="data.page.relatedPosters" />
    <related-products-section
      :products="data?.page?.relatedProducts"
    />
  </div>
</template>
