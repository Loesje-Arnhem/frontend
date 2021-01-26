const loadRoughBoxedCSS = async () => {
  await window.CSS.paintWorklet.addModule('/roughBoxes.js')
  window.document.body.classList.add('is-loaded')
}
loadRoughBoxedCSS()
