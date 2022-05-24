const urlParams = new URLSearchParams(window.location.search)
const standalone = urlParams.get('standalone')
if (standalone === 'true') {
  document.documentElement.classList.add('standalone')
}

if ('registerProtocolHandler' in navigator) {
  navigator.registerProtocolHandler('web+loesje', 'posters/%s')
}
