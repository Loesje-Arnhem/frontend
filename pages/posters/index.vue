<template>
  <div>
    <poster-filters />
    <posters-auto-complete-container />
    <posters-overview-section :sources="sources" :subjects="subjects" />
    <!-- <div class="page">
      <h1>{{ title }}</h1>
      <navigation />
      <filters :sources="sources" :subjects="subjects" />
      <auto-complete @onSearch="searchPosters" />
      <List
        :search="search"
        :subjects="selectedSubjectsIds"
        :sources="selectedSourcesIds"
      />
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostersOverviewSection from '~/components/Posters/PostersOverview/PostersOverviewSection.vue'
import PostersAutoCompleteContainer from '~/components/Posters/AutoComplete/AutoCompleteContainer.vue'
import PosterFilters from '~/components/Posters/Filters/PosterFilters.vue'

// import Filters from '~/components/Search/Filters.vue'
// import AutoComplete from '~/components/Search/AutoComplete.vue'
// import Navigation from '~/components/Shared/Navigation.vue'
// import PosterFilterTags from '~/components/Posters/Filters/PosterFilterTags.vue'
// import List from '~/components/Shared/List.vue'

export default {
  components: {
    PostersOverviewSection,
    PostersAutoCompleteContainer,
    PosterFilters,
    // AutoComplete,
    // Navigation,
    // Filters,
    // PosterFilterTags
    // List
  },

  data() {
    return {
      title: 'Posters',
      search: 'test',
      selectedTags: [],
    }
  },
  computed: {
    ...mapState('tags', ['sources', 'subjects']),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
