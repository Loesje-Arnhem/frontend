<template>
  <div>
    <poster-filters />
    <posters-auto-complete />
    <poster-filter-tags :list="tags" />
    <posters-overview-section
      :sources="sourceIds"
      :subjects="subjectIds"
      :search="search"
    />
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
import { mapState, mapGetters } from 'vuex'
import PostersOverviewSection from '~/components/Posters/PostersOverview/PostersOverviewSection.vue'
import PostersAutoComplete from '~/components/Posters/AutoComplete/AutoComplete.vue'
import PosterFilters from '~/components/Posters/Filters/PosterFilters.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'

// import Filters from '~/components/Search/Filters.vue'
// import AutoComplete from '~/components/Search/AutoComplete.vue'
// import Navigation from '~/components/Shared/Navigation.vue'
// import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'
// import List from '~/components/Shared/List.vue'

export default {
  components: {
    PostersOverviewSection,
    PostersAutoComplete,
    PosterFilters,
    PosterFilterTags,
    // AutoComplete,
    // Navigation,
    // Filters,
    // PosterFilterTags
    // List
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
