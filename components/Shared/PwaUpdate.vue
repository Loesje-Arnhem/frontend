<template>
  <app-alert v-if="hasUpdate">
    Er is een nieuwe content beschikbaar.
    <button class="btn-link" @click="update">Verversen</button>
  </app-alert>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { WorkboxUpdatableEvent } from 'workbox-window'

export default defineComponent({
  setup() {
    const hasUpdate = ref(false)
    let registration: ServiceWorkerRegistration | null

    const update = () => {
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
              hasUpdate.value = true
            }
          },
        )
      }
    })
    return {
      hasUpdate,
      update,
    }
  },
})
</script>
