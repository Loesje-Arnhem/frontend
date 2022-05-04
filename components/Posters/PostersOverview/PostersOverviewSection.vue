<template>
  <section v-if="relatedPosters" aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        <template v-if="notIn">
          {{ $t('relatedTitle') }}
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
import {
  defineComponent,
  ref,
  PropType,
  computed,
} from '@nuxtjs/composition-api'
import { useFetchMore } from '~/composables/useFetch'
import { PAGE_SIZE_POSTERS } from '~/data/pageSizes'
import PostersQuery from '~/graphql/Posters/Posters.gql'
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
      default: () => {},
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
    sources: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    posterIds: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    notIn: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const relatedPosters = ref(props.posters)

    const { fetchMore, loading } = useFetchMore()

    const where = computed(() => {
      const subjectList = props.subjectIds
      const sourcesList = props.sources

      if (props.posterIds.length) {
        return {
          in: props.posterIds,
        }
      }
      const taxQuery: { taxArray: ITaxQuery[] } = {
        taxArray: [],
      }
      if (subjectList.length) {
        taxQuery.taxArray.push({
          terms: subjectList.map(String),
          taxonomy: 'SUBJECT',
          operator: 'IN',
        })
      }
      if (sourcesList.length) {
        taxQuery.taxArray.push({
          terms: sourcesList.map(String),
          taxonomy: 'SOURCE',
          operator: 'IN',
        })
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

    const loadMore = async () => {
      const { posters } = await fetchMore({
        items: relatedPosters,
        query: PostersQuery,
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

<i18n>
{
  "nl": {
    "title": "Posters",
    "relatedTitle": "Gerelateerde posters"
  }
}
</i18n>
