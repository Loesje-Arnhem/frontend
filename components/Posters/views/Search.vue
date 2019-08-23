<template>
  <div class="home">
    <Navigation />
    <AutoComplete @onSearch="searchPosters" />
    <Filters />
    <Tags v-if="selectedTags.length" :list="selectedTags" />
    <List
      :search="search"
      :subjects="selectedSubjectsIds"
      :sources="selectedSourcesIds"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Navigation from '@/components/Shared/Navigation.vue'

import Filters from '@/components/Search/Filters.vue'
import Tags from '@/components/Search/Tags.vue'
import List from '@/components/Shared/List.vue'

export default {
  components: {
    Navigation,
    AutoComplete,
    Filters,
    List,
    Tags
  },
  data() {
    return {
      search: null
    }
  },
  computed: {
    ...mapGetters({
      selectedSubjects: 'tags/selectedSubjects',
      selectedSources: 'tags/selectedSources',
      selectedTags: 'tags/selectedTags'
    }),
    selectedSourcesIds() {
      return this.selectedSources.map(item => item.id)
    },
    selectedSubjectsIds() {
      return this.selectedSubjects.map(item => item.id)
    }
  },
  methods: {
    searchPosters(value) {
      this.search = value
    }
  }
}
</script>
