<script lang="ts" setup>
import PosterQuery from '~/graphql/Posters/Poster'
import { IPoster } from '~~/interfaces/IPoster'

defineI18nRoute({
  paths: {
    nl: '/posters/:slug',
  },
})

const route = useRoute()
const { data, pending } = await useAsyncQuery<{ poster: IPoster | null }>(
  PosterQuery,
  {
    slug: route.params.slug,
  },
)

if (!data.value?.poster) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}

useMeta(data.value?.poster)

const subjects = computed(() => {
  if (!data.value?.poster) {
    return []
  }
  if (data.value.poster.subjects.edges.length) {
    return data.value.poster.subjects.edges.map(
      (subject) => subject.node.databaseId,
    )
  }
  return []
})
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data?.poster">
    <center-wrapper>
      <poster-details :poster="data.poster" />
    </center-wrapper>
    <!-- <related-products-section :related-products="data.poster.relatedProducts" /> -->
    <posters-overview-section
      :not-in="data.poster.databaseId"
      :subject-ids="subjects"
      :title="$t('relatedPosters')"
    />
  </div>
</template>
