<template>
  <app-alert v-if="hasUpdate">
    Er is een nieuwe versie beschikbaar.
    <button class="btn-link" @click="clickToUpdate">
      Updaten naar de laatste versie
    </button>
  </app-alert>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const hasUpdate = ref(false)

    const clickToUpdate = () => {
      window.location.reload()
    }

    onMounted(async () => {
      if (!process.client) {
        return
      }
      // @ts-ignore
      const workbox = await window.$workbox
      if (workbox) {
        // @ts-ignore
        workbox.addEventListener('installed', (event) => {
          // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
          if (
            event.isUpdate &&
            document.documentElement.classList.contains('standalone')
          ) {
            // whatever logic you want to use to notify the user that they need to refresh the page.
            hasUpdate.value = true
          }
        })
      }
    })
    return {
      hasUpdate,
      clickToUpdate,
    }
  },
})
</script>
