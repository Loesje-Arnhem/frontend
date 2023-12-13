<script lang="ts" setup>
import { SearchPoster } from '~/graphql/posters'

const search = useSearch()
const searchField = ref(search.value)

const enabled = computed(() => searchField.value.length > 2)

const route = useRoute()
const localePath = useLocalePath()

const { result } = useQuery(
  SearchPoster,
  () => ({
    search: searchField.value,
  }),
  {
    enabled,
    debounce: 200,
  },
)

const posters = computed(() => {
  if (searchField.value.length < 2) {
    return []
  }
  return result.value?.posters?.edges.map((poster) => {
    const uri = localePath({
      name: 'posters-details',
      params: {
        slug: poster.node.slug?.toString() || '',
      },
    })
    return {
      id: poster.node.databaseId,
      title: poster.node.title || '',
      uri,
    }
  })
})

onMounted(() => {
  const { q } = route.query
  if (q) {
    searchField.value = q.toString()
    search.value = q.toString()
  }
})

const submit = () => {
  navigateTo(
    {
      ...route,
      query: {
        ...route.query,
        q: searchField.value,
      },
    },
    {
      replace: true,
    },
  )
  search.value = searchField.value
}
</script>

<template>
  <autocomplete-field
    v-model="searchField"
    :results="posters"
    :title="$t('searchPosters')"
    :placeholder="$t('searchPostersByText')"
    @submit="submit"
  />
</template>
