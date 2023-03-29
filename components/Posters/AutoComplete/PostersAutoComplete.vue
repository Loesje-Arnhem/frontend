<script lang="ts" setup>
import { Endpoints } from '~~/enums/endpoints';

const search = useSearch()
const searchField = ref(search.value)
const route = useRoute()
const enabled = computed(() => searchField.value.length > 3)
const localePath = useLocalePath()

const submit = () => {
  search.value = searchField.value
}

const { data } = useFetch(Endpoints.PosterSearch, {
  key: 'search',
  params: {
    search: searchField
  },
  watch: [searchField],
  immediate:false
})

onMounted(() => {
  const { q } = route.query
  if (q) {
    searchField.value = q.toString()
    search.value = q.toString()
  }
})

const posters = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value.map(item => {
    const uri = localePath({
      name: 'posters-details',
      params: {
        slug: item.slug
      }
    })
    return {
      id: item.id,
      title: item.title,
      uri
    }
  })
})
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
