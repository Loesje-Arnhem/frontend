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
  <div v-if="data?.page">
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page?.videoGroup?.youtubeId"
    />
    <form-workshop />
    <related-posters-section :posters="data.page.relatedPosters" />
    
    <related-products-section
      v-if="data?.page?.relatedProducts"
      :products="data.page.relatedProducts"
    />

    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>
