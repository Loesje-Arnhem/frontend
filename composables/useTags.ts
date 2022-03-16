import { ref } from '@nuxtjs/composition-api'

const search = ref('')

export default () => {
  const updateSearch = (value: string) => {
    search.value = value
  }

  return {
    updateSearch,
    search,
  }
}
