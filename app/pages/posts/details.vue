<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws/[slug]',
  },
})

const route = useRoute()

const { data } = await useAsyncData(
  `post-${route.params.slug.toString()}`,
  () =>
    $fetch('/api/posts/post', {
      params: {
        slug: route.params.slug.toString(),
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
  description: data.value.description,
  image: data.value.featuredImage,
})

useSchemaOrg(
  defineArticle({
    datePublished: data.value.date,
    headline: data.value.title,
    description: data.value.seo?.metaDesc,
  }),
)
</script>

<template>
  <div v-if="data">
    <app-content
      :image="data.featuredImage"
      :title="data.title"
      :content="data.content"
      :date="data.date"
      :video="data.youtubeId"
    />
    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
    <posts-overview-section :exclude="data.id" />
  </div>
</template>
