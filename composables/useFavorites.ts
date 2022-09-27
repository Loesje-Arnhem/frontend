import { ref } from '@nuxtjs/composition-api'
// our fake endpoint to store data
const SHARED_DATA_ENDPOINT = '/token'

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
    fetch(SHARED_DATA_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ token: 'sampletoken' }),
    }).then(() => {
      console.log('saved to cache')
    })
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
    fetch(SHARED_DATA_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log('Got', data, 'from cache')
      })
  }

  return {
    getFromStorage,
    add,
    remove,
    favorites,
  }
}
