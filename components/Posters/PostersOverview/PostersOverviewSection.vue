<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ title }}
      </h1>
      <poster-list
        v-if="posters && posters.edges.length"
        :posters="posters.edges"
      />
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
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import usePosters from '~/compositions/posters'
import LoadMore from '~/components/LoadMore/LoadMoreByScroll.vue'

export default {
  setup(props) {
    const { notIn, subjects, sources, search } = props

    const { posters, loading, error, loadMore } = usePosters({
      first: 10,
      search,
      subjects,
      notIn,
      sources,
    })

    return {
      posters,
      loading,
      error,
      loadMore,
    }
  },
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
}
</script>

<i18n>
{
  "nl": {
    "title": "Posters"
  }
}
</i18n>
