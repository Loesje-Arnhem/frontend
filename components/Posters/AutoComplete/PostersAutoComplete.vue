<template>
  <form-auto-complete
    v-model="search"
    :results="list"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @submit="submit"
  />
</template>

<script>
import {
  useContext,
  computed,
  onMounted,
  useRoute,
  useRouter,
  ref,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import SearchQuery from '~/graphql/Posters/Search.gql'
import useTags from '~/composables/useTags'

export default {
  setup() {
    const { app } = useContext()
    const search = ref('')

    const { updateSearch } = useTags()
    const route = useRoute()
    const router = useRouter()
    const enabled = computed(() => search.value.length > 2)

    const submit = () => {
      updateSearch(search.value)

      let query = null
      if (search.value) {
        query = { q: search.value }
      }
      const route = app.localePath({
        name: 'posters',
        query,
      })
      router.replace(route)
    }

    const { result } = useQuery(
      SearchQuery,
      { search },
      {
        enabled,
      },
    )

    onMounted(() => {
      const { q } = route.value.query
      if (q) {
        search.value = q
        updateSearch(q)
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
