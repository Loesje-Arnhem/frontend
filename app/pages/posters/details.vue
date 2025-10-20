<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters/[slug]',
  },
})

const route = useRoute()

const { data, error } = await useAsyncData(
  `poster-${route.params.slug.toString()}`,
  () =>
    $fetch('/api/posters/poster', {
      params: {
        slug: route.params.slug.toString(),
      },
    }),
)

if (error.value) {
  throw createError(error.value)
}

useMeta({
  title: data.value.title,
  description: data.value.title,
  image: data.value.featuredImage,
})

useSchemaOrg(
  defineArticle({
    datePublished: data.value.date,
    headline: data.value.title,
    // description: data.value.seo?.metaDesc,
  }),
)
</script>

<template>
  <div v-if="data">
    <center-wrapper>
      <poster-details :poster="data" />
    </center-wrapper>
    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />
    <posters-overview-section
      :exclude="data.id"
      :subject-ids="data.subjects.map((subject) => subject.id)"
      :title="$t('relatedPosters')"
    />
  </div>
</template>
