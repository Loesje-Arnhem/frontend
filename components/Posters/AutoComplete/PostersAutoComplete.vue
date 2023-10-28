<script lang="ts" setup>
import { type  IAutocomplete } from '~/types/IAutocomplete'

const search = useSearch()
const searchField = ref(search.value)
const route = useRoute()
const localePath = useLocalePath()

const submit = () => {
  search.value = searchField.value
}

const posters: Ref<IAutocomplete[]> = ref([])

watch(searchField, async () => {
  if (searchField.value.length < 2) {
    posters.value = []
    return
  }
  const result = await GqlSearchPoster({
    search: searchField.value,
  })
  if (!result.posters) {
    posters.value = []
    return
  }
  posters.value = result.posters.edges.map((poster) => {
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
