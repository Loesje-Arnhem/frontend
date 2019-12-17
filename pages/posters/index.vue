<template>
  <div>
    {{ selectedTags }}

    <poster-filters />
    <posters-auto-complete-container />
    <posters-overview-container />
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
import PostersOverviewContainer from '@/components/Posters/PostersOverview/PostersOverviewContainer.vue'
import PostersAutoCompleteContainer from '@/components/Posters/AutoComplete/AutoCompleteContainer.vue'
import PosterFilters from '@/components/Posters/Filters/PosterFilters.vue'
import { selectedTagsQuery } from '@/plugins/apollo-config.js'

// import Filters from '@/components/Search/Filters.vue'
// import AutoComplete from '@/components/Search/AutoComplete.vue'
// import Navigation from '@/components/Shared/Navigation.vue'
// import PosterFilterTags from '@/components/Posters/Filters/PosterFilterTags.vue'
// import List from '@/components/Shared/List.vue'

export default {
  components: {
    PostersOverviewContainer,
    PostersAutoCompleteContainer,
    PosterFilters
    // AutoComplete,
    // Navigation,
    // Filters,
    // PosterFilterTags
    // List
  },
  apollo: {
    selectedTags: {
      query: selectedTagsQuery
    }
  },
  data() {
    return {
      title: 'Posters',
      search: '',
      selectedTags: []
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
