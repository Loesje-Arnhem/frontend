<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`posts`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.posts,
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
    <h1 class="sr-only">
      {{ data.title }}
    </h1>
    <posts-overview-section />

    <related-posters-section
      v-if="data"
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />

    <!-- <related-products-section :products="data?.page?.relatedProducts" /> -->
  </div>
</template>
