<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters/[slug]',
  },
})

const route = useRoute()

const { data } = await useAsyncData(
  `poster-${route.params.slug.toString()}`,
  () =>
    $fetch('/api/posters/poster', {
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
    // description: data.value.seo?.metaDesc,
  }),
)
</script>

<template>
  <div v-if="data">
    <center-wrapper>
      <poster-details :poster="data" />
    </center-wrapper>
    <!-- <related-products-section :products="data.poster?.relatedProducts" /> -->
    <posters-overview-section
      :exclude="data.id"
      :subject-ids="data.subjects.map((subject) => subject.id)"
      :title="$t('relatedPosters')"
    />
  </div>
</template>
