import { ref } from '@nuxtjs/composition-api'

const favorites = ref([] as number[])
const FAVORITES_KEY = 'favorites'

// see: https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
self.addEventListener('activate', (event) => {
  /* @ts-ignore */
  event.waitUntil(clients.claim())
  console.log('aaaa')
})

self.addEventListener('fetch', (event) => {
  const {
    /* @ts-ignore */
    request,
    /* @ts-ignore */
    request: { url, method },
  } = event
  if (url.match(FAVORITES_KEY)) {
    if (method === 'POST') {
      /* @ts-ignore */
      request.json().then((body) => {
        caches.open('favorites').then(function (cache) {
          cache.put('favorites', new Response(JSON.stringify([1, 2, 3])))
        })
      })
      return new Response('{}')
    } else {
      /* @ts-ignore */
      event.respondWith(
        caches.open('favorites').then(function (cache) {
          return (
            cache.match('favorites').then(function (response) {
              return response || new Response('{}')
            }) || new Response('{}')
          )
        }),
      )
    }
  } else {
    return event
  }
})
await fetch(FAVORITES_KEY, {
  method: 'POST',
  body: JSON.stringify({ favorites: [1, 2, 4] }),
})
const response = await fetch(FAVORITES_KEY)
console.log(response)
const data = await response.json()
const storedFavorites = data
console.log(storedFavorites)

export default () => {
  const add = (posterId: number) => {
    favorites.value.unshift(posterId)
    updateStorage()
  }

  const remove = (posterId: number) => {
    favorites.value = favorites.value.filter((id) => id !== posterId)
    updateStorage()
  }

  const updateStorage = async () => {
    if (!process.client) {
      return
    }

    try {
      const cache = await caches.open(FAVORITES_KEY)
      await cache.put(
        FAVORITES_KEY,
        new Response(JSON.stringify({ favorites: [1, 2, 3] })),
      )
    } catch (error) {
      console.log(error)
    }

    // window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
    // try {
    //   await fetch(FAVORITES_KEY, {
    //     method: 'POST',
    //     body: JSON.stringify({ favorites: [1, 2, 4] }),
    //   })
    // } catch {}
  }

  const getFromStorage = async () => {
    if (!process.client) {
      return
    }

    try {
      const cache = await caches.open(FAVORITES_KEY)
      const response = await cache.match(FAVORITES_KEY)
      const storedFavorites = response
      // if (!storedFavorites) {
      //   return
      // }
      console.log(storedFavorites)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getFromStorage,
    add,
    remove,
    favorites,
  }
}
