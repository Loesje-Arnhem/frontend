const urlParams = new URLSearchParams(window.location.search)
const standalone = urlParams.get('standalone')
if (standalone === 'true') {
  document.documentElement.classList.add('standalone')
}
