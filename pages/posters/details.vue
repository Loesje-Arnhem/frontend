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

if (!data.value?.poster) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data?.poster">
    <center-wrapper>
      <poster-details :poster="data.poster" />
    </center-wrapper>
    <related-products-section :related-products="data.poster.relatedProducts" />
    <posters-overview-section
      v-if="data.poster"
      :not-in="data.poster.databaseId"
      :posters="data.poster.relatedPosters"
      :subject-ids="subjects"
      :title="$t('relatedTitle')"
    />
  </div>
</template>

<i18n>
{
  "nl": {
    "relatedTitle": "Gerelateerde posters"
  }
}
</i18n>
