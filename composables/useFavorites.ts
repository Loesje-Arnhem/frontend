import { useFavoriteIds } from './useState'

const FAVORITES_KEY = 'favorites'

export const useFavorites = () => {
  const favorites = useFavoriteIds()

  const add = (posterId: number) => {
    favorites.value.unshift(posterId)
    updateStorage()
  }

  const remove = (posterId: number) => {
    // favorites.value = favorites.value.filter((id) => id !== posterId)
    // updateStorage()
  }

  const updateStorage = () => {
    if (!process.client) {
      return
    }
    console.log('aa')

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
  }
}
