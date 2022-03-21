import { ref } from '@nuxtjs/composition-api'

const favorites = ref([] as number[])

export default () => {
  return {
    favorites,
  }
}
