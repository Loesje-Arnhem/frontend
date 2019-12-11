<template>
  <apollo-query
    :query="require('~/graphql/Posters.gql')"
    :variables="{ first: 10, where: { search: search } }"
  >
    <template slot-scope="{ result: { data }, query }">
      <auto-complete :data="data" @searchForPosters="searchForPosters(query)" />
    </template>
  </apollo-query>
</template>

<script>
import AutoComplete from '@/components/Posters/AutoComplete/AutoComplete.vue'

export default {
  components: {
    AutoComplete
  },
  data() {
    return {
      search: ''
    }
  },

  methods: {
    searchForPosters(search) {
      window.console.log(search)
    }
  }
}
</script>
