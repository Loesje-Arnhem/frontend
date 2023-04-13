<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/workshops',
  },
})
const { pageIds } = useAppConfig()

const { data } = await usePageById(pageIds.workshops)
</script>

<template>
  <!-- <app-loader v-if="pending" />
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
     <related-posters-section :posters="data.relatedPosters" /> -->
  <!-- <related-products-section
    v-if="data.relatedProducts.length"
    :product-ids="data.relatedProducts"
  /> -->
  <div v-if="data?.page">
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page?.videoGroup?.youtubeId"
    />
    <related-posters-section :posters="data.page.relatedPosters" />

    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>
