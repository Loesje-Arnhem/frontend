const TOTAL_POSTERS_KEY = 'posters-badge'

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

  const registerPeriodicSync = async () => {
    // Request permission

    const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
    })
    if (status.state !== 'granted') {
      return
    }
    // Register new sync every 24 hours
    await registration.periodicSync.register(TOTAL_POSTERS_KEY, {
      // minInterval: 24 * 60 * 60 * 1000, // 1 day
      minInterval: 60 * 60 * 1000, // 1 hour
    })
  }
  registerPeriodicSync()

  registration.active.postMessage({
    type: TOTAL_POSTERS_KEY,
  })
}
