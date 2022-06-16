importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js')

const TOTAL_POSTERS_KEY = 'total'

const fetchTotalPosts = async () => {
  const response = await fetch(`/total.json`)
  if (!response.ok) {
    return
  }
  const { total } = await response.json()
  return Number(total)
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
  const newTotal = total - storedTotal

  navigator.setAppBadge(newTotal)
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'total') {
    event.waitUntil(setAppBadge())
  }
})

// On the Service Worker side we have to listen to the message event
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === TOTAL_POSTERS_KEY) {
    const total = await fetchTotalPosts()
    await idbKeyval.set(TOTAL_POSTERS_KEY, Number(total))

    navigator.clearAppBadge()
  }
})
