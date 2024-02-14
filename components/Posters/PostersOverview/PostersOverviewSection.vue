<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

const props = withDefaults(
  defineProps<{
    title?: string
    search?: string
    dateBefore?: string
    dateAfter?: string
    subjectIds?: number[]
    sourceIds?: number[]
    include?: number[]
    exclude?: number
  }>(),
  {
    title: undefined,
    search: undefined,
    dateBefore: undefined,
    dateAfter: undefined,
    subjectIds: () => [],
    sourceIds: () => [],
    posterIds: () => [],
    include: () => [],
    exclude: undefined,
  },
)

const page = ref(1)
const posters = ref<IPosterListItem[]>([])
const hasNextPage = ref(false)
const isLoading = ref(false)

const fetchPosters = async () => {
  isLoading.value = true
  const response = await $fetch('/api/posters/posters', {
    query: {
      subjectIds: props.subjectIds.join(','),
      sourceIds: props.sourceIds.join(','),
      include: props.include,
      dateAfter: props.dateAfter,
      dateBefore: props.dateBefore,
      exclude: props.exclude,
      search: props.search,
      page: page.value,
    },
  })
  posters.value = [...posters.value, ...response.items]
  hasNextPage.value = response.hasNextPage
  isLoading.value = false
}
await fetchPosters()

watch(
  [
    () => props.search,
    () => props.sourceIds,
    () => props.subjectIds,
    () => props.dateAfter,
    () => props.dateBefore,
  ],
  async () => {
    posters.value = []
    hasNextPage.value = false
    page.value = 1
    await fetchPosters()
  },
)

const loadMore = async () => {
  page.value = page.value + 1
  await fetchPosters()
}
</script>

<template>
  <app-loader v-if="isLoading && !posters.length" />
  <section v-else-if="posters.length" aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title" class="sa-hidden">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          {{ $t('posters') }}
        </template>
      </h1>
    </center-wrapper>
    <poster-list :posters="posters" />
    <center-wrapper v-if="hasNextPage">
      <load-more-by-scroll :loading="isLoading" @load-more="loadMore" />
    </center-wrapper>
  </section>

  <center-wrapper v-else-if="!posters.length && !isLoading">
    <p>Geen posters gevonden</p>
  </center-wrapper>
</template>
