import { ref } from '@nuxtjs/composition-api'

const FAVORITES_KEY = 'favorites'
const favorites = ref([] as number[])

export default () => {
  const add = (posterId: number) => {
    favorites.value.unshift(posterId)
    updateStorage()
  }

  const remove = (posterId: number) => {
    favorites.value = favorites.value.filter((id) => id !== posterId)
    updateStorage()
  }

  const updateStorage = () => {
    if (!process.client) {
      return
    }

    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
  }

  const getFromStorage = () => {
    if (!process.client) {
      return
    }
    const storedFavorites = window.localStorage.getItem(FAVORITES_KEY)

    if (!storedFavorites) {
      return
    }
    favorites.value = JSON.parse(storedFavorites)
  }

  return {
    getFromStorage,
    add,
    remove,
    favorites,
  }
}
