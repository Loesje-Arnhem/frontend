<script lang="ts" setup>
import { GetPosters } from '~/graphql2/posters'

type TaxQuery = {
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

type Date = {
  year: number
  month: number
  day: number
}

const createTaxArray = (ids: number[], key: string) => {
  return {
    terms: ids.map(String),
    taxonomy: key,
    operator: 'IN',
  }
}

const include = computed(() => {
  if (!props.include.length) {
    return undefined
  }
  return props.include.map((id) => id.toString())
})

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

const notIn = computed(() => {
  if (!props.exclude) {
    return undefined
  }
  return [props.exclude.toString()]
})

const taxQuery = computed(() => {
  const query: { taxArray: TaxQuery[] } = {
    taxArray: [],
  }
  if (props.subjectIds.length) {
    const taxArray = createTaxArray(props.subjectIds, 'SUBJECT')
    query.taxArray.push(taxArray)
  }
  if (props.sourceIds.length) {
    const taxArray = createTaxArray(props.sourceIds, 'SOURCE')
    query.taxArray.push(taxArray)
  }
  return query
})

const { result, loading, fetchMore } = useQuery(GetPosters, () => ({
  where: {
    in: include.value,
    taxQuery: taxQuery.value,
    posterDateAfter: posterDateAfter.value,
    posterDateBefore: posterDateBefore.value,
    notIn: notIn.value,
    search: props.search,
  },
}))
const loadMore = async () => {
  await fetchMore({
    variables: {
      after: result.value?.posters?.pageInfo.endCursor,
    },

    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!previousResult?.posters?.edges.length) return previousResult
      if (!fetchMoreResult?.posters?.edges.length) return previousResult
      return {
        ...fetchMoreResult,
        posters: {
          ...fetchMoreResult.posters,
          edges: [
            ...previousResult.posters.edges,
            ...fetchMoreResult.posters.edges,
          ],
        },
      }
    },
  })
}
</script>

<template>
  <app-loader v-if="loading && !result" />
  <section v-else-if="result?.posters" aria-labelledby="posters-overview-title">
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
    <poster-list :posters="result.posters" />
    <center-wrapper>
      <load-more-by-scroll
        v-if="result.posters.pageInfo.hasNextPage"
        :loading="loading"
        @load-more="loadMore"
      />
      <p v-if="result.posters.edges.length === 0 && !loading">
        Geen posters gevonden
      </p>
    </center-wrapper>
  </section>
</template>
