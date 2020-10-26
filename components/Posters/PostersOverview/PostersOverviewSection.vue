<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ title }}
      </h1>
    </center-wrapper>
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
import { usePosters, setupWhere } from '~/compositions/posters'
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
    const where = computed(() => {
      return setupWhere({
        subjects: props.subjects,
        sources: props.sources,
        search: props.search,
        notIn: props.notIn,
      })
    })

    const { posters, loading, error, loadMore, refetch } = usePosters({
      search: props.search,
      subjects: props.subjects.value,
      sources: props.sources.value,
      notIn: props.notIn,
    })

    watch(where, (first) => {
      refetch({
        where: where.value,
      })
    })

    return {
      posters,
      loading,
      error,
      loadMore,
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
