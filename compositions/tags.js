import { reactive } from '@nuxtjs/composition-api'

export default () => {
  const searchFromCompositionAPI = reactive({
    search: 'testtest',
  })

  // const searchFromCompositionAPI = computed(() => search.value)

  const updateSearch = (value) => {
    searchFromCompositionAPI.search = value
  }

  return {
    searchFromCompositionAPI,
    updateSearch,
  }
}
