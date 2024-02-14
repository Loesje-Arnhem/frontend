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

const posterDateAfterProp = toRef(props, 'dateAfter')
const posterDateBeforeProp = toRef(props, 'dateBefore')
const searchProp = toRef(props, 'search')
const subjectIdsProp = computed(() => props.subjectIds.join(','))
const sourceIdsProp = computed(() => props.sourceIds.join(','))

const page = ref(1)

const { pending, data, refresh } = useFetch('/api/posters/posters', {
  query: {
    subjectIds: subjectIdsProp,
    sourceIds: sourceIdsProp,
    include: props.include,
    dateAfter: posterDateAfterProp,
    dateBefore: posterDateBeforeProp,
    exclude: props.exclude,
    search: searchProp,
    page,
  },
  watch: false,
  transform(response) {
    if (!data.value) {
      return response
    }

    if (page.value === 1) {
      return response
    }

    const items: {
      items: IPosterListItem[]
      hasNextPage: boolean
    } = {
      items: [...data.value.items, ...response.items],
      hasNextPage: response.hasNextPage,
    }
    return items
  },
})

watch(
  [
    subjectIdsProp,
    sourceIdsProp,
    posterDateAfterProp,
    posterDateBeforeProp,
    searchProp,
  ],
  async () => {
    data.value = null
    page.value = 1
    refresh()
  },
)

const loadMore = async () => {
  page.value = page.value + 1
  refresh()
}
</script>

<template>
  <app-loader v-if="pending && !data" />
  <section
    v-else-if="data?.items.length"
    aria-labelledby="posters-overview-title"
  >
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
    <poster-list :posters="data.items" />
    <center-wrapper v-if="data.hasNextPage">
      <load-more-by-scroll :loading="pending" @load-more="loadMore" />
    </center-wrapper>
  </section>

  <center-wrapper v-if="!data?.items.length && !pending">
    <p>Geen posters gevonden</p>
  </center-wrapper>
</template>
