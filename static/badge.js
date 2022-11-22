importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js')

const TOTAL_POSTERS_KEY = 'posters-badge-v2'

const fetchTotalPosts = async () => {
  try {
    const response = await fetch(
      `https://www.loesje.nl/wp-content/uploads/posters/total-posters.json`,
    )
    if (!response.ok) {
      return
    }
    const { total } = await response.json()
    return Number(total)
  } catch (error) {
    // console.error(error)
  }
}

const setAppBadge = async () => {
  const total = await fetchTotalPosts()
  const storedTotal = await idbKeyval.get(TOTAL_POSTERS_KEY)

  if (!storedTotal) {
    return
  }

  if (total === storedTotal) {
    return
  }

  const difference = total - storedTotal

  navigator.setAppBadge(difference)
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === TOTAL_POSTERS_KEY) {
    event.waitUntil(setAppBadge())
  }
})

// On the Service Worker side we have to listen to the message event
self.addEventListener('message', async (event) => {
  if (event.data === TOTAL_POSTERS_KEY) {
    const total = await fetchTotalPosts()
    await idbKeyval.set(TOTAL_POSTERS_KEY, total)

    navigator.clearAppBadge()
  }
})
