<template>
  <form-auto-complete
    v-model="searchField"
    :results="list"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @submit="submit"
  />
</template>

<script>
import { computed, onMounted, useRoute, ref } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import SearchQuery from '~/graphql/Posters/Search'
import useTags from '~/composables/useTags'

export default {
  setup() {
    const { search } = useTags()
    const searchField = ref(search.value)
    const route = useRoute()
    const enabled = computed(() => searchField.value.length > 2)

    const submit = () => {
      search.value = searchField.value
    }

    const { result } = useQuery(
      SearchQuery,
      { search: searchField },
      {
        enabled,
      },
    )

    onMounted(() => {
      const { q } = route.value.query
      if (q) {
        searchField.value = q
        search.value = q
      }
    })

    const posters = useResult(result)

    const list = computed(() => {
      if (!enabled.value || !posters.value) return []
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
      searchField,
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
