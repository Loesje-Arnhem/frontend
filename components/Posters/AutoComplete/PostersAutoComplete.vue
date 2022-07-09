<template>
  <form-auto-complete
    v-model="searchField"
    :results="list"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @submit="submit"
  />
</template>

<script lang="ts">
import {
  computed,
  onMounted,
  useRoute,
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import SearchQuery from '~/graphql/Posters/Search'
import useTags from '~/composables/useTags'
import { IPosterAutocomplete } from '~/interfaces/IPoster'

export default defineComponent({
  setup() {
    const { search } = useTags()
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
      const { q } = route.value.query
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

    return {
      list,
      submit,
      searchField,
    }
  },
})
</script>

<i18n>
{
  "nl": {
    "title": "Zoeken naar posters",
    "placeholder": "Zoeken naar posters op tekst"
  }
}
</i18n>
