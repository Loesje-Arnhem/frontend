<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/posters/[slug]',
  },
})

const route = useRoute()

const { data, error } = await useAsyncGql('GetPoster', {
  slug: route.params.slug.toString(),
})

const subjectIds = computed(() => {
  if (!data.value?.poster?.subjects) {
    return []
  }
  return data.value.poster.subjects.edges.map(subject => subject.node.databaseId)
})


useMeta(data.value?.poster)
</script>

<template>
  <div v-if="data?.poster">
    <center-wrapper>
      <poster-details :poster="data.poster" />
    </center-wrapper>
    <related-products-section
      :products="data.poster?.relatedProducts"
    />
    <posters-overview-section
      :exclude="data.poster.databaseId"
      :subject-ids="subjectIds"
      :title="$t('relatedPosters')"
    />
  </div>
</template>
