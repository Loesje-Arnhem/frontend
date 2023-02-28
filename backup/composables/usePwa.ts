import { ref, Ref } from '@nuxtjs/composition-api'
import { IBeforeInstallPromptEvent } from '~/interfaces/IBeforeInstallPromptEvent'

const installEvent: Ref<IBeforeInstallPromptEvent | undefined> = ref(undefined)
const isInstalled = ref(false)

const storageKey = 'pwa-installed'
const storageValue = '1'

export default () => {
  const install = async () => {
    if (!process.client) {
      return
    }
    if (!installEvent.value) {
      return
    }
    installEvent.value.prompt()
    const choiceResult = await installEvent.value.userChoice
    if (choiceResult.outcome === 'accepted') {
      localStorage.setItem(storageKey, storageValue)
    }
  }

  const checkIsInstalled = () => {
    if (!process.client) {
      return
    }
    if (localStorage.getItem(storageKey) === storageValue) {
      isInstalled.value = true
    }
  }

  const addInstallListener = () => {
    if (!process.client) {
      return
    }
    window.addEventListener('beforeinstallprompt', (event) => {
      localStorage.removeItem(storageKey)
      installEvent.value = event as IBeforeInstallPromptEvent
      window.console.log(event)
    })
  }

  return {
    installEvent,
    addInstallListener,
    install,
    isInstalled,
    checkIsInstalled,
  }
}
