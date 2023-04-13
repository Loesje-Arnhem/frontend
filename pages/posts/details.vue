<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws/:slug',
  },
})

const route = useRoute()

const { data, error } = await useAsyncGql('GetPost', {
  slug: route.params.slug.toString(),
})


// useMeta(data.value?.post)
</script>

<template>
  <div v-if="data?.post">
    <app-content
      :image="data.post.featuredImage"
      :title="data.post.title"
      :content="data.post.content"
      :date="data.post.date"
      :video="data.post?.videoGroup?.youtubeId"
    />

    <related-posters-section
      :posters="data.post.relatedPosters"
      :title="data.post.relatedPostersGroup?.title"
    />
    <!-- <related-products-section
      v-if="data.relatedProducts.length"
      :product-ids="data.relatedProducts"
    /> -->
    <posts-overview-section :exclude="data.post.databaseId" />
  </div>
</template>
