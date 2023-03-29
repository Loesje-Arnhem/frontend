<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws/:slug',
  },
})

const route = useRoute()

const { data, pending } = await useFetch('/api/post', {
  key: `post-${route.params.slug}`,
  params: {
    slug: route.params.slug,
  },
})

// useMeta(data.value?.post)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <app-content
      :image="data.featuredImage"
      :title="data.title"
      :content="data.content"
      :date="data.date"
      :video="data.youtubeId"
    />

    <related-posters-section :posters="data.relatedPosters" />
    <!-- <related-products-section :related-products="data.post.relatedProducts" /> -->
    <posts-overview-section :exclude="data.id" />
  </div>
</template>
