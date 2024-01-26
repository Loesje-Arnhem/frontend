<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/over-loesje/nieuws/[slug]',
  },
})

const route = useRoute()
const { data } = useFetch('/api/posts/post', {
  query: {
    slug: route.params.slug.toString(),
  },
})

// useMeta(data.value)

useSchemaOrg(
  defineArticle({
    datePublished: data.value?.date,
    headline: data.value?.title,
    description: data.value?.seo?.metaDesc,
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
    <posts-overview-section :exclude="data.post.databaseId" />
  </div>-->
</template>
