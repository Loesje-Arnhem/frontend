<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <navigation />
    <filters :sources="sources" :subjects="subjects" />

    <auto-complete />
    <tags v-if="selectedTags.length" :list="selectedTags" />
    <List
      :search="search"
      :subjects="selectedSubjectsIds"
      :sources="selectedSourcesIds"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '~/plugins/axios'

import Filters from '@/components/Search/Filters.vue'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Navigation from '@/components/Shared/Navigation.vue'
import Tags from '@/components/Search/Tags.vue'
import List from '@/components/Shared/List.vue'

export default {
  components: {
    AutoComplete,
    Navigation,
    Filters,
    Tags,
    List
  },
  data() {
    return {
      title: 'Posters'
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

  async asyncData({ params }) {
    const sourcesApi = await axios.get('wp/v2/source')
    const subjectsApi = await axios.get('wp/v2/subject')
    return {
      sources: sourcesApi.data,
      subjects: subjectsApi.data
    }
  },

  methods: {
    searchPosters(value) {
      this.search = value
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
