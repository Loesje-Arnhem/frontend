const setAppBadge = async () => {
  const response = await fetch(`/total.json`)
  if (!response.ok) {
    return
  }
  const { total } = await response.json()

  navigator.setAppBadge(Number(total))
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'total') {
    event.waitUntil(setAppBadge())
  }
})
