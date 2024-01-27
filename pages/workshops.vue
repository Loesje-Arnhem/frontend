<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/workshop-creatief-schrijven',
  },
})
const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-workshop`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.workshops,
    },
  }),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

useMeta({
  title: data.value.title,
})
</script>

<template>
  <div v-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <form-workshop />
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
    <!-- <related-products-section
      v-if="data?.page?.relatedProducts"
      :products="data.page.relatedProducts"
    /> -->
  </div>
</template>
