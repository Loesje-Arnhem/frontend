// if (navigator.setAppBadge) {
//   // set badge

//   navigator.setAppBadge(42)
// }

// import { apiUrl } from '~/data/siteDetails'
const TOTAL_POSTERS_KEY = 'total'

const fetchTotalPosts = async () => {
  const storedTotal = window.localStorage.getItem(TOTAL_POSTERS_KEY)

  const response = await fetch(`/total.json`)
  if (!response.ok) {
    return
  }
  const { total } = await response.json()

  if (total === storedTotal) {
    return
  }
  const newTotal = Number(storedTotal) - Number(total)

  window.localStorage.setItem(TOTAL_POSTERS_KEY, total)

  navigator.setAppBadge(newTotal)
}

export default async () => {
  /* eslint-disable-next-line */
  if (!'setAppBadge' in navigator) {
    return
  }

  /* eslint-disable-next-line */
  if (!'serviceWorker' in navigator) {
    return
  }
  const registration = await navigator.serviceWorker.ready

  // Check if periodicSync is supported
  /* eslint-disable-next-line */
  if (!'periodicSync' in registration) {
    return
  }

  // Request permission
  const status = await navigator.permissions.query({
    name: 'periodic-background-sync',
  })
  if (status.state !== 'granted') {
    return
  }
  // Register new sync every 24 hours
  await registration.periodicSync.register(TOTAL_POSTERS_KEY, {
    minInterval: 24 * 60 * 60 * 1000, // 1 day
  })

  const tags = await registration.periodicSync.getTags()
  if (tags.includes(TOTAL_POSTERS_KEY)) {
    fetchTotalPosts()
  }
}
