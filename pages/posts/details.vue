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
    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
    <posts-overview-section :exclude="data.id" />
  </div>
  <!--
    <div v-if="data?.post">
    <app-content
      :image="data.post.featuredImage"
      :title="data.post.title"
      :content="data.post.content"
      :date="data.post.date"
      :video="data.post?.videoGroup?.youtubeId"
    />
    -->
  <!-- <related-posters-section
    :posters="data.relatedPosters"
    :title="data.relatedPostersGroup?.title"
  /> -->
  <!--
    <related-products-section :products="data?.post?.relatedProducts" />
    
  </div>-->
</template>
