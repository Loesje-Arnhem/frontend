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
  <div v-else-if="data">
    <h1 class="sr-only">
      {{ data.title }}
    </h1>
    <posts-overview-section />
    <related-posters-section :posters="data.relatedPosters" />
    <!-- :related-products="data.page.relatedProducts" /> -->
  </div>
</template>
