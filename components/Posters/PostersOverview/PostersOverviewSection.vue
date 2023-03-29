<script lang="ts" setup>
import { Endpoints } from '~~/enums/endpoints';

interface ITaxQuery {
  terms: string[]
  taxonomy: string
  operator: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    search?: string
    dateBefore?: string
    dateAfter?: string
    subjectIds?: number[]
    sourceIds?: number[]
    posterIds?: number[]
    exclude?: number
  }>(),
  {
    subjectIds: () => [],
    sourceIds: () => [],
    posterIds: () => [],
  },
)

const createTaxArray = (ids: number[], key: string) => {
  return {
    terms: ids.map(String),
    taxonomy: key,
    operator: 'IN',
  }
}

const where = computed(() => {
  if (props.posterIds.length) {
    return {
      in: props.posterIds,
    }
  }
  const taxQuery: { taxArray: ITaxQuery[] } = {
    taxArray: [],
  }
  if (props.subjectIds.length) {
    const taxArray = createTaxArray(props.subjectIds, 'SUBJECT')
    taxQuery.taxArray.push(taxArray)
  }
  if (props.sourceIds.length) {
    const taxArray = createTaxArray(props.sourceIds, 'SOURCE')
    taxQuery.taxArray.push(taxArray)
  }
  let posterDateAfter = null
  if (props.dateAfter) {
    const splittedDate = props.dateAfter.split('-')
    posterDateAfter = {
      year: parseInt(splittedDate[0], 10),
      month: parseInt(splittedDate[1], 10),
      day: parseInt(splittedDate[2], 10),
    }
  }
  let posterDateBefore = null
  if (props.dateBefore) {
    const splittedDate = props.dateBefore.split('-')
    posterDateBefore = {
      year: parseInt(splittedDate[0], 10),
      month: parseInt(splittedDate[1], 10),
      day: parseInt(splittedDate[2], 10),
    }
  }
  return {
    exclude: props.exclude,
    search: props.search,
    taxQuery: taxQuery.taxArray.length ? taxQuery : null,
    posterDateBefore,
    posterDateAfter,
  }
})

const search = toRef(props, 'search')

const { data, pending } = useFetch(Endpoints.Posters, {
  query: {
    search: search,
    subjectIds: props.subjectIds.join(','),
    exclude: props.exclude
  },
  watch: [search],
  server: false
})

// const loadMore = () => {
//   fetchMore({
//     variables: {
//       after: result.value?.posters.pageInfo.endCursor,
//     },
//     updateQuery: (previousResult, { fetchMoreResult }) => {
//       // No new feed posts
//       if (!fetchMoreResult) return previousResult

//       // Concat previous feed with new feed posts
//       return {
//         ...fetchMoreResult,
//         posters: {
//           ...fetchMoreResult.posters,
//           pageInfo: fetchMoreResult.posters.pageInfo,
//           edges: [
//             ...previousResult.posters.edges,
//             ...fetchMoreResult.posters.edges,
//           ],
//         },
//       }
//     },
//   })
// }

</script>

<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1
        id="posters-overview-title"
        class="sa-hidden"
      >
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          {{ $t('posters') }}
        </template>
      </h1>
    </center-wrapper>
    <app-loader v-if="pending" />
    <template v-else-if="data">
      <poster-list
        v-if="data"
        :posters="data"
      />
      <!-- <center-wrapper>
        <load-more-by-scroll
          v-if="result.posters.pageInfo.hasNextPage"
          :loading="loading"
          @load-more="loadMore"
        />
        <p v-if="result.posters.edges.length === 0 && !loading">
          Geen posters gevonden
        </p>
      </center-wrapper> -->
    </template>
  </section>
</template>
