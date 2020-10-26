<template>
  <div>
    <center-wrapper>
      <poster-filters />
      <posters-auto-complete />
      <poster-filter-tags :list="tags" />
    </center-wrapper>
    searchFromCompositionAPI = {{ searchFromCompositionAPI.search }}
    <posters-overview-section
      :sources="sourceIds"
      :subjects="subjectIds"
      :search="search"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import useSearch from '@/compositions/tags'

export default {
  setup() {
    const { searchFromCompositionAPI } = useSearch()

    return {
      searchFromCompositionAPI,
    }
  },

  data() {
    return {
      title: 'Posters',
      selectedTags: [],
    }
  },

  computed: {
    ...mapState('tags', ['tags', 'search']),

    ...mapGetters({
      sourceIds: 'tags/sourceIds',
      subjectIds: 'tags/subjectIds',
    }),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
