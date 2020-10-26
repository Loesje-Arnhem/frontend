<template>
  <auto-complete
    v-model="search"
    :results="results"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @close="close"
    @submit="updateSearch"
  />
</template>

<script>
import { mapActions } from 'vuex'
import { useContext, computed, ref } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import AutoComplete from '~/components/Forms/AutoComplete.vue'
import SearchQuery from '~/graphql/Posters/Search.gql'

export default {
  components: {
    AutoComplete,
  },
  setup() {
    const { store } = useContext()
    const search = ref(store.state.tags.search)
    const enabled = computed(() => search.value.length > 2)

    const { result } = useQuery(
      SearchQuery,
      { search },
      {
        prefetch: false,
        debounce: 200,
        enabled,
        fetchPolicy: 'no-cache',
      },
    )

    const posters = useResult(result)

    const results = computed(() => {
      if (!enabled.value) {
        return {
          edges: [],
        }
      }
      return posters.value
    })

    return {
      results,
      search,
    }
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
