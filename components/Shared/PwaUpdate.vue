<template>
  <app-alert :show="needRefresh" text="Er is een nieuwe versie beschikbaar.">
    <button class="btn-link" @click="updateServiceWorker">Verversen</button>
  </app-alert>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { WorkboxUpdatableEvent } from 'workbox-window'

export default defineComponent({
  setup() {
    const needRefresh = ref(false)
    let registration: ServiceWorkerRegistration | null

    const updateServiceWorker = () => {
      if (registration?.waiting) {
        registration.waiting.postMessage('SKIP_WAITING')
      }
      window.location.reload()
    }

    onMounted(async () => {
      if (!('serviceWorker' in navigator)) {
        return
      }
      registration = await navigator.serviceWorker.ready

      // @ts-ignore-next-line
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener(
          'installed',
          (event: WorkboxUpdatableEvent) => {
            // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
            if (event.isUpdate) {
              // whatever logic you want to use to notify the user that they need to refresh the page.
              needRefresh.value = true
            }
          },
        )
      }
    })
    return {
      needRefresh,
      updateServiceWorker,
    }
  },
})
</script>
