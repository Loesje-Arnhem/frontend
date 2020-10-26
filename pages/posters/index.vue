<template>
  <div>
    <center-wrapper>
      <poster-filters />
      <posters-auto-complete />
      <poster-tags-list :list="selectedTags" />
    </center-wrapper>
    searchFromCompositionAPI = {{ searchFromCompositionAPI.search }}
    <posters-overview-section
      :sources="selectedSourceIds"
      :subjects="selectedSubjectIds"
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
    }
  },

  computed: {
    ...mapState('tags', ['selectedTags', 'search']),
    ...mapGetters('tags', ['selectedSourceIds', 'selectedSubjectIds']),
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
