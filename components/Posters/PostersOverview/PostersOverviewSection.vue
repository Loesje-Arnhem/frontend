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

// const posterDateAfter = computed(() => {
//   if (!props.dateAfter) {
//     return undefined
//   }
//   const splittedDate = props.dateAfter.split('-')
//   return {
//     year: parseInt(splittedDate[0], 10),
//     month: parseInt(splittedDate[1], 10),
//     day: parseInt(splittedDate[2], 10),
//   }
// })

// const posterDateBefore = computed(() => {
//   if (!props.dateBefore) {
//     return undefined
//   }
//   const splittedDate = props.dateBefore.split('-')
//   return {
//     year: parseInt(splittedDate[0], 10),
//     month: parseInt(splittedDate[1], 10),
//     day: parseInt(splittedDate[2], 10),
//   }
// })

const searchFromProp = toRef(props, 'search')
const subjectIdsFromProp = computed(() => props.subjectIds.join(','))
const sourceIdsFromProp = computed(() => props.sourceIds.join(','))

const page = ref(1)
const posters = ref<IPosterListItem[]>([])
const hasNextPage = ref(false)

const { pending } = useFetch('/api/posters/posters', {
  query: {
    subjectIds: subjectIdsFromProp,
    sourceIds: sourceIdsFromProp,
    include: props.include,
    // posterDateAfter: posterDateAfter.value,
    // posterDateBefore: posterDateBefore.value,
    exclude: props.exclude,
    search: searchFromProp,
    page,
  },
  transform(response) {
    hasNextPage.value = response.hasNextPage
    posters.value = [...posters.value, ...response.items]
  },
})

const loadMore = () => {
  page.value = page.value + 1
}
</script>

<template>
  <app-loader v-if="pending && !posters.length" />
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
      <load-more-by-scroll :loading="pending" @load-more="loadMore" />
    </center-wrapper>
  </section>
  <p v-if="!posters.length && !pending">Geen posters gevonden</p>
</template>
