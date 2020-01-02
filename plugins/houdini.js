import 'css-paint-polyfill'

const loadRoughBoxedCSS = async () => {
  await window.CSS.paintWorklet.addModule('/roughBoxes.js')
  window.document.body.classList.add('is-loaded')
}

// window.onNuxtReady(() => {
loadRoughBoxedCSS()
// })
