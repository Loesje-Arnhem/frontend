<script lang="ts" setup>
type TaxQuery ={
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

const createTaxArray = (ids: number[], key: string) => {
  return {
    terms: ids.map(String),
    taxonomy: key,
    operator: 'IN',
  }
}

const where = computed(() => {
  if (props.include.length) {
    return {
      in: props.include,
    }
  }
  const taxQuery: { taxArray: TaxQuery[] } = {
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
    notIn: props.exclude,
    search: props.search,
    taxQuery: taxQuery.taxArray.length ? taxQuery : null,
    posterDateBefore,
    posterDateAfter,
  }
})

const { data, pending } = await useAsyncGql('GetPosters', {
  where: where.value,
})

watch(where, async () => {
  pending.value = true
  data.value = null

  data.value = await GqlGetPosters({
    where: where.value,
  })

  pending.value = false
})

const loadMore = async () => {
  if (!data.value?.posters?.edges.length) {
    return
  }

  pending.value = true
  const result = await GqlGetPosters({
    where: where.value,
  })

  if (!result.posters?.edges.length) {
    return
  }

  data.value = {
    posters: {
      pageInfo: result.posters.pageInfo,
      edges: [...data.value.posters.edges, ...result.posters.edges],
    },
  }
  pending.value = false
}
</script>

<template>
  <app-loader v-if="pending && !data" />
  <section
    v-else-if="data?.posters"
    aria-labelledby="posters-overview-title"
  >
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
    <template v-if="data">
      <poster-list :posters="data.posters" />
      <center-wrapper>
        <load-more-by-scroll
          v-if="data.posters.pageInfo.hasNextPage"
          :loading="pending"
          @load-more="loadMore"
        />
        <p v-if="data.posters.edges.length === 0 && !pending">
          Geen posters gevonden
        </p>
      </center-wrapper>
    </template>
  </section>
</template>
