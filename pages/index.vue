<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/',
  },
})

const { pageIds } = useAppConfig()

const { data, pending } = await usePageById(pageIds.workshops)
</script>

<template>
  <app-loader v-if="pending" />

  <div v-else-if="data">
    <h1 class="sr-only">
      {{ data.title }}
    </h1>
    <latest-posts-section />
    <related-posters-section v-if="data" :posters="data.relatedPosters" />
    <app-stores-section />
    <!-- <related-products-section :related-products="data.page.relatedProducts" /> -->
  </div>
</template>
