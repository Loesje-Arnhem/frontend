export default defineNuxtPlugin(() => {
  const loadRoughBoxedCSS = async () => {
    // @ts-ignore
    await window.CSS.paintWorklet.addModule('/roughBoxes.js')
    window.document.body.classList.add('is-loaded')
  }

  if ('paintWorklet' in window.CSS) {
    loadRoughBoxedCSS()
  }
})
