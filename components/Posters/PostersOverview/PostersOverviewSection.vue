<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ title }}
      </h1>
    </center-wrapper>
    <button @click="refetch2">zoeken naar {{ counter }}</button>
    <poster-list
      v-if="posters && posters.edges.length"
      :posters="posters.edges"
    />
    from props = {{ search2 }}
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
import { watch, useContext, computed, ref } from '@nuxtjs/composition-api'
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
    const { notIn, subjects, sources, search } = props

    const { store } = useContext()

    // Watch prop value change and assign to value 'selected' Ref

    const { posters, loading, error, loadMore, refetch } = usePosters({
      search,
      subjects,
      notIn,
      sources,
    })
    const testa = ref('')

    const counter = computed(() => store.state.tags.search)
    watch(counter, (first, second) => {
      // console.log(
      //   'Watch props.selected function called with args:',
      //   first,
      //   second,
      // )
      // Both props are undefined so its just a bare callback func to be run
    })
    const refetch2 = () => {
      testa.value = 'sadasd'
      refetch({
        where: {
          search: counter,
        },
      })
    }

    return {
      search2: search,
      refetch2,
      counter,
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
