<script lang="ts" setup>
const search = useSearch()
const searchField = ref(search.value)

const route = useRoute()
const localePath = useLocalePath()

const { data } = useFetch('/api/posters/search', {
  query: {
    search: searchField,
  },
  watch: [searchField],
  immediate: false,
})

const posters = computed(() => {
  if (searchField.value.length < 2) {
    return []
  }
  if (!data.value) {
    return []
  }
  return data.value.map((poster) => {
    const uri = localePath({
      name: 'posters-details',
      params: {
        slug: poster.slug,
      },
    })
    return {
      id: poster.id,
      title: poster.title,
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
