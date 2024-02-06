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

const posterDateAfter = toRef(props, 'dateAfter')
const posterDateBefore = toRef(props, 'dateBefore')
const searchFromProp = toRef(props, 'search')
const subjectIdsFromProp = computed(() => props.subjectIds.join(','))
const sourceIdsFromProp = computed(() => props.sourceIds.join(','))

const page = ref(1)
const posters = ref<IPosterListItem[]>([])
const hasNextPage = ref(false)

const { pending, data } = useFetch('/api/posters/posters', {
  query: {
    subjectIds: subjectIdsFromProp,
    sourceIds: sourceIdsFromProp,
    include: props.include,
    // posterDateAfter: posterDateAfter.value,pnp
    // posterDateBefore: posterDateBefore.value,
    dateAfter: posterDateAfter,
    dateBefore: posterDateBefore,
    exclude: props.exclude,
    search: searchFromProp,
    page,
  },
  // transform(response) {
  //   hasNextPage.value = response.hasNextPage
  //   data.value = [...data.value, ...response.items]
  // },
})

const loadMore = () => {
  page.value = page.value + 1
}
</script>

<template>
  <app-loader v-if="pending" />
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
    <!-- <center-wrapper v-if="hasNextPage">
      <load-more-by-scroll :loading="pending" @load-more="loadMore" />
    </center-wrapper> -->
  </section>

  <center-wrapper v-if="!data?.items.length && !pending">
    <p>Geen posters gevonden</p>
  </center-wrapper>
</template>
