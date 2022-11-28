import '@nuxt/types'
import { IBeforeInstallPromptEvent } from '~/interfaces/IBeforeInstallPromptEvent'

declare module '@nuxt/types' {
  interface Context {
    $beforeInstallPromptEvent: IBeforeInstallPromptEvent | undefined
  }
}
