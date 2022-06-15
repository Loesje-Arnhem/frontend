// if (navigator.setAppBadge) {
//   // set badge

//   navigator.setAppBadge(42)
// }

// import { apiUrl } from '~/data/siteDetails'
// const TOTAL_POSTERS_KEY = 'total'

// export default async () => {
//   // if (!navigator.setAppBadge) {
//   //   return
//   // }
//   const storedTotal = window.localStorage.getItem(TOTAL_POSTERS_KEY)

//   const response = await fetch(`${apiUrl}/total.json`)
//   if (!response.ok) {
//     return
//   }
//   const { total } = await response.json()

//   if (total === storedTotal) {
//     return
//   }
//   const newTotal = Number(storedTotal) - Number(total)

//   window.localStorage.setItem(TOTAL_POSTERS_KEY, total)

//   navigator.setAppBadge(newTotal)
// }

// Check if service workers are supported
export default async () => {
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
  try {
    // Register new sync every 24 hours
    await registration.periodicSync.register('news', {
      minInterval: 24 * 60 * 60 * 1000, // 1 day
    })
    console.log('Periodic background sync registered!')
  } catch (e) {
    console.error(`Periodic background sync failed:\n${e}`)
  }
}
