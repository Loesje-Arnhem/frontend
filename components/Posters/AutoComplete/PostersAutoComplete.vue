<template>
  <auto-complete
    v-model="search"
    :results="list"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @submit="submit"
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
    const search = ref(store.state.tags.search)
    const enabled = computed(() => search.value.length > 2)

    const submit = () => {
      store.dispatch('tags/search', search.value)
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
    const list = computed(() => {
      if (!posters.value) return []
      return posters.value.edges.map((item) => {
        return {
          id: item.node.id,
          title: item.node.title,
          uri: item.node.uri,
        }
      })
    })

    return {
      list,
      submit,
      search,
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
