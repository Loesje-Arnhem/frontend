const FAVORITES_KEY = 'favorites'

export const useFavorites = () => {
  const favorites = useState<number[]>('favorites', () => [])

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
  }
}
