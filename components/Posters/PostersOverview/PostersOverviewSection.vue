<script lang="ts" setup>
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

const posterDateAfter = computed(() => {
  if (!props.dateAfter) {
    return undefined
  }
  const splittedDate = props.dateAfter.split('-')
  return {
    year: parseInt(splittedDate[0], 10),
    month: parseInt(splittedDate[1], 10),
    day: parseInt(splittedDate[2], 10),
  }
})

const posterDateBefore = computed(() => {
  if (!props.dateBefore) {
    return undefined
  }
  const splittedDate = props.dateBefore.split('-')
  return {
    year: parseInt(splittedDate[0], 10),
    month: parseInt(splittedDate[1], 10),
    day: parseInt(splittedDate[2], 10),
  }
})

const search2 = toRef(props, 'search')

const { data, pending } = useFetch('/api/posters/posters', {
  query: {
    subjectIds: props.subjectIds,
    sourceIds: props.sourceIds,
    include: props.include,
    // posterDateAfter: posterDateAfter.value,
    // posterDateBefore: posterDateBefore.value,
    exclude: props.exclude,
    search: search2.value,
  },
  watch: [search2],
})
const loadMore = () => {
  // await fetchMore({
  //   variables: {
  //     after: result.value?.posters?.pageInfo.endCursor,
  //   },
  //   updateQuery: (previousResult, { fetchMoreResult }) => {
  //     if (!previousResult?.posters?.edges.length) return previousResult
  //     if (!fetchMoreResult?.posters?.edges.length) return previousResult
  //     return {
  //       ...fetchMoreResult,
  //       posters: {
  //         ...fetchMoreResult.posters,
  //         edges: [
  //           ...previousResult.posters.edges,
  //           ...fetchMoreResult.posters.edges,
  //         ],
  //       },
  //     }
  //   },
  // })
}
</script>

<template>
  {{ search2 }}
  <app-loader v-if="pending && !data?.length" />
  <section v-else-if="data?.length" aria-labelledby="posters-overview-title">
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
    <poster-list :posters="data" />
    <center-wrapper>
      <!-- <load-more-by-scroll
        v-if="result.posters.pageInfo.hasNextPage"
        :loading="loading"
        @load-more="loadMore"
      /> -->
      <p v-if="data.length === 0 && !pending">Geen posters gevonden</p>
    </center-wrapper>
  </section>
</template>
