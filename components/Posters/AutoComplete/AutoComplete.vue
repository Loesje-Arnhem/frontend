<template>
  <div>
    searchFromCompositionAPI = {{ searchFromCompositionAPI }}
    <auto-complete
      v-model="search"
      :results="{ edges: [] }"
      :title="$t('title')"
      :placeholder="$t('placeholder')"
      @input="searchPosters"
      @close="close"
      @submit="updateSearch2"
    />
  </div>
</template>

<script>
import AutoComplete from '@/components/Forms/AutoComplete.vue'
import { mapActions } from 'vuex'
import { useContext } from '@nuxtjs/composition-api'
import useSearch from '@/compositions/tags'
import { useSearchPosters } from '~/compositions/posters'

export default {
  components: {
    AutoComplete,
  },
  setup() {
    const { searchFromCompositionAPI, updateSearch } = useSearch()
    const { store } = useContext()
    const { posters, search, searchPosters } = useSearchPosters(
      store.state.tags.search,
    )

    return {
      searchFromCompositionAPI,
      searchPosters,
      posters,
      search,
      updateSearch2: updateSearch,
    }
  },
  computed: {
    search2() {
      return this.$store.getters['tags/search']
    },
  },

  methods: {
    ...mapActions({
      updateSearch: 'tags/search',
    }),
    submit(value) {
      this.updateSearch(value)
    },
    close() {
      this.results = {}
    },
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Zoeken naar posters",
    "placeholder": "Zoeken naar posters op tekst"
  }
}
</i18n>
