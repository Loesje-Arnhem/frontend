<template>
  <section v-if="relatedPosters" aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title" class="sa-hidden">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          {{ $t('title') }}
        </template>
      </h1>
    </center-wrapper>
    <poster-list
      v-if="relatedPosters && relatedPosters.edges.length"
      :posters="relatedPosters.edges"
    />
    <center-wrapper>
      <load-more-by-scroll
        v-if="relatedPosters.pageInfo.hasNextPage"
        :loading="loading"
        @load-more="loadMore"
      />
      <p v-if="relatedPosters.edges.length === 0 && !loading">
        Geen posters gevonden
      </p>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { PAGE_SIZE_POSTERS } from '~/data/pageSizes'
import { GetPosters } from '~/graphql/Posters/Poster'
import { IRelatedPosters } from '~/interfaces/IPoster'

interface ITaxQuery {
  terms: string[]
  taxonomy: string
  operator: string
}

export default defineComponent({
  props: {
    posters: {
      type: Object as PropType<IRelatedPosters>,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    search: {
      type: String,
      default: null,
    },
    dateBefore: {
      type: String,
      default: null,
    },
    dateAfter: {
      type: String,
      default: null,
    },
    subjectIds: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    sourceIds: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    posterIds: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    notIn: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const relatedPosters = ref(props.posters)

    const { fetchMore, loading } = useFetchMore()

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
        notIn: props.notIn,
        search: props.search,
        taxQuery: taxQuery.taxArray.length ? taxQuery : null,
        posterDateBefore,
        posterDateAfter,
      }
    })
    watch(where, () => {
      relatedPosters.value = {
        pageInfo: {
          endCursor: '',
          hasNextPage: true,
        },
        edges: [],
      }
      loadMore()
    })
    const loadMore = async () => {
      const { posters } = await fetchMore({
        items: relatedPosters,
        query: GetPosters,
        variables: {
          where: where.value,
          first: PAGE_SIZE_POSTERS,
        },
      })

      relatedPosters.value = {
        pageInfo: posters.pageInfo,
        edges: [...relatedPosters.value.edges, ...posters.edges],
      }
    }

    return {
      loadMore,
      loading,
      relatedPosters,
    }
  },
})
</script>

<!-- <i18n>
{
  "nl": {
    "title": "Posters"
  }
}
<i18n> -->
