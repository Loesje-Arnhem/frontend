const TOTAL_POSTERS_KEY = 'posters-badge-v2'

export default async ({ isDev }) => {
  /* eslint-disable-next-line */
  if (!'setAppBadge' in navigator) {
    return
  }

  navigator.clearAppBadge()

  /* eslint-disable-next-line */
  if (!'serviceWorker' in navigator) {
    return
  }

  if (isDev) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready

    // Check if periodicSync is supported
    /* eslint-disable-next-line */
    if (!'periodicSync' in registration) {
      return
    }

    const registerPeriodicSync = async () => {
      // Request permission
      try {
        const status = await navigator.permissions.query({
          name: 'periodic-background-sync',
        })
        if (status.state === 'granted') {
          // Register new sync every 24 hours
          await registration.periodicSync.register(TOTAL_POSTERS_KEY, {
            // minInterval: 24 * 60 * 60 * 1000, // 1 day
            minInterval: 60 * 60 * 1000, // 1 hour
          })
        }
      } catch (error) {}
    }
    await registerPeriodicSync()

    registration.active.postMessage(TOTAL_POSTERS_KEY)
  } catch (error) {}
}
