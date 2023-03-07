<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import SearchQuery from '~/graphql/Posters/Search'
import { IPosterAutocomplete } from '~/interfaces/IPoster'

const search = useSearch()
const searchField = ref(search.value)
const route = useRoute()
const enabled = computed(() => searchField.value.length > 3)

const submit = () => {
  search.value = searchField.value
}

// @ts-ignore
const { result } = useQuery(
  SearchQuery,
  { search: searchField },
  {
    enabled,
    debounce: 1000,
  },
)

onMounted(() => {
  const { q } = route.query
  if (q) {
    searchField.value = q.toString()
    search.value = q.toString()
  }
})

const posters = computed(() => {
  if (!result.value) {
    return []
  }
  return result.value.posters.edges
})

const list = computed(() => {
  if (!enabled.value || !posters.value.length) return []
  return posters.value.map((item: IPosterAutocomplete) => {
    return {
      id: item.node.id,
      title: item.node.title,
      uri: item.node.uri,
    }
  })
})
</script>

<template>
  aaa {{ $t('searchPosters') }}
  <form-auto-complete
    v-model="searchField"
    :results="list"
    :title="$t('searchPosters')"
    :placeholder="$t('searchPostersByText')"
    @submit="submit"
  />
</template>
