<script lang="ts" setup>
import { Endpoints } from '~~/enums/endpoints';

defineI18nRoute({
  paths: {
    nl: '/posters/:slug',
  },
})

const route = useRoute()

const { data, pending } = await useFetch(Endpoints.Poster, {
  key: `poster-${route.params.slug}`,
  params: {
    slug: route.params.slug,
  },
})

const subjectIds = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.subjects.map(subject => subject.id)
})

// useMeta(data.value?.poster)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <center-wrapper>
      <!-- <poster-details :poster="data" /> -->
    </center-wrapper>
    <!-- <related-products-section :related-products="data.poster.relatedProducts" /> -->
    <!-- <posters-overview-section
      :exclude="data.id"
      :subject-ids="subjectIds"
      :title="$t('relatedPosters')"
    /> -->
  </div>
</template>
