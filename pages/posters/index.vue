<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <navigation />
    <filters :sources="sources" :subjects="subjects" />

    <auto-complete />
    <Tags v-if="selectedTags.length" :list="selectedTags" />

    <Posters :posters="posters" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '~/plugins/axios'

import Filters from '@/components/Search/Filters.vue'
import AutoComplete from '@/components/Search/AutoComplete.vue'
import Posters from '@/components/Shared/Posters.vue'
import Navigation from '@/components/Shared/Navigation.vue'

export default {
  components: {
    AutoComplete,
    Posters,
    Navigation,
    Filters
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
    const response = await axios.get(`wp/v2/poster`)
    const sourcesApi = await axios.get('wp/v2/source')
    const subjectsApi = await axios.get('wp/v2/subject')
    return {
      posters: response.data,
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
