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
    v-else-if="data?.page"
    class="page"
  >
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page.videoGroup.youtubeId"
    />
    <form-workshop />
    <related-posters-section :posters="data.page.relatedPosters" />
    <!-- <related-products-section :related-products="data.page.relatedProducts" /> -->
  </div>
</template>
