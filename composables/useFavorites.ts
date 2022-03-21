import { ref } from '@nuxtjs/composition-api'

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

    window.localStorage.setItem('favs', JSON.stringify(favorites.value))
  }

  const getFromStorage = () => {
    if (!process.client) {
      return
    }
    const storedFavorites = window.localStorage.getItem('favs')

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
