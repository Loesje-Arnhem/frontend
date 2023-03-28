<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/workshops',
  },
})
const { pageIds } = useAppConfig()

const { data, pending } = await usePageById(pageIds.workshops)
</script>

<template>
  <app-loader v-if="pending" />
  <div
    v-else-if="data"
    class="page"
  >
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <form-workshop />
    <related-posters-section :posters="data.relatedPosters" />
    <!-- <related-products-section :related-products="data.page.relatedProducts" /> -->
  </div>
</template>
