<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ sectionTitle }}
      </h1>
      <poster-list
        v-if="posters && posters.edges.length"
        :posters="posters.edges"
      />
      <app-loader v-if="loading" />
      <load-more
        v-else-if="posters.pageInfo.hasNextPage"
        :title="$t('btnMore')"
        @loadMore="loadMore"
      />
      <p v-if="posters && posters.edges.length === 0">Geen posters gevonden</p>
    </center-wrapper>
  </section>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import usePosters from '~/compositions/posters'
import LoadMore from '~/components/LoadMore/LoadMoreByClick.vue'

export default {
  setup(props) {
    const { notIn, subjects, sources, search } = props

    const { posters, loading, error, loadMore } = usePosters({
      search,
      subjects,
      notIn,
      sources,
    })

    const state = computed(() => {
      if (loading.value) return 'loading'
      if (!posters.value.pageInfo.hasNextPage) return 'completed'
      return null
    })

    return {
      state,
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
      default: null,
    },
  },
  computed: {
    sectionTitle() {
      if (this.title) {
        return this.title
      }
      return this.$t('title')
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
