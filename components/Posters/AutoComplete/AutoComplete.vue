<template>
  <auto-complete
    v-model="search"
    :results="results"
    title="Zoeken naar posters"
    placeholder="Zoeken naar posters op tekst"
    @input="input"
    @close="close"
  />
</template>

<script>
import AutoComplete from '@/components/Forms/AutoComplete.vue'
import SearchQuery from '~/graphql/Posters/Search.gql'

export default {
  components: {
    AutoComplete,
  },

  data() {
    return {
      search: '',
    }
  },
  apollo: {
    results: {
      query: SearchQuery,
      variables() {
        return {
          search: this.search,
        }
      },
      debounce: 200,
      skip: true,
      update: (data) => data.posters.edges,
    },
  },

  methods: {
    input() {
      this.$apollo.queries.results.skip = false
    },
    close() {
      this.$apollo.queries.results.skip = true
      this.results = []
    },
  },
}
</script>
