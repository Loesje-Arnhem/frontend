<script lang="ts" setup>
import { SearchPoster } from '~/graphql2/posters'

const searchField = ref('')
const search = useSearch()
const route = useRoute()
const localePath = useLocalePath()

const enabled = computed(() => searchField.value.length > 2)

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
  }
})

const submit = () => {
  search.value = searchField.value
}
</script>

<template>
  <form-auto-complete
    v-model="searchField"
    :results="posters"
    :title="$t('searchPosters')"
    :placeholder="$t('searchPostersByText')"
    @submit="submit"
  />
</template>
