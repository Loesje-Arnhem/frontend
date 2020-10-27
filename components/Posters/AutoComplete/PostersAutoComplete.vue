<template>
  <auto-complete
    v-model="search"
    :results="results"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @close="reset"
    @submit="submit"
    @input="updateString"
  />
</template>

<script>
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
    const submitted = ref(false)
    const search = ref(store.state.tags.search)
    const updateString = () => (submitted.value = false)

    const enabled = computed(() => search.value.length > 2 && !submitted.value)

    const reset = () => {
      store.dispatch('tags/search', '')
    }

    const submit = () => {
      store.dispatch('tags/search', search.value)
      submitted.value = true
    }

    const { result } = useQuery(
      SearchQuery,
      { search },
      {
        prefetch: false,
        debounce: 400,
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
      updateString,
      submit,
      results,
      search,
      reset,
    }
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
