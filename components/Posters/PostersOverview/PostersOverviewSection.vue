<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ title }}
      </h1>
    </center-wrapper>
    <p>sources2: {{ sources2 }}</p>
    <p>sources from props: {{ sources }}</p>
    {{ where }}
    <poster-list
      v-if="posters && posters.edges.length"
      :posters="posters.edges"
    />
    <center-wrapper>
      <load-more
        v-if="posters && posters.edges.length"
        :loading="loading"
        :has-more="posters && posters.pageInfo.hasNextPage"
        @load-more="loadMore"
      />
      <p v-if="posters && posters.edges.length === 0">Geen posters gevonden</p>
    </center-wrapper>
  </section>
</template>

<script>
import { computed, watch } from '@nuxtjs/composition-api'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import usePosters from '~/compositions/posters'
import LoadMore from '~/components/LoadMore/LoadMoreByScroll.vue'

export default {
  components: {
    LoadMore,
    PosterList,
    CenterWrapper,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
    notIn: {
      type: Number,
      default: 0,
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    sources: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default() {
        return this.$t('title')
      },
    },
  },
  setup(props) {
    const sourcesFromProps = computed(() => props.sources)
    const subjectsFromProps = computed(() => props.subjects)

    const where = computed(() => {
      const taxQuery = {
        taxArray: [],
      }
      if (props.subjects.length) {
        taxQuery.taxArray.push({
          terms: props.subjects,
          taxonomy: 'SUBJECT',
          operator: 'IN',
        })
      }
      if (props.sources.length) {
        taxQuery.taxArray.push({
          terms: props.sources,
          taxonomy: 'SOURCE',
          operator: 'IN',
        })
      }
      return {
        notIn: [props.notIn],
        search: props.search,
        taxQuery: taxQuery.taxArray.length ? taxQuery : null,
      }
    })

    const { posters, loading, error, loadMore, refetch } = usePosters({
      search: props.search,
      subjects: subjectsFromProps.value,
      sources: sourcesFromProps.value,
      notIn: props.notIn,
    })

    watch(where, (first) => {
      refetch({
        where: where.value,
      })
    })

    return {
      where,
      search2: props.search,
      posters,
      loading,
      error,
      loadMore,
      sources2: sourcesFromProps,
    }
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Posters"
  }
}
</i18n>
