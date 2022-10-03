<template>
  <div class="page">
    <vue-announcer />
    <window-controls-overlay />
    <header-top class="page-header-top sa-hidden" />
    <the-header class="page-header sa-hidden" />

    <div>
      hasUpdate={{ hasUpdate }}
      <app-button v-if="hasUpdate" @click="clickToUpdate"
        >clickToUpdate
      </app-button>
    </div>
    <main id="content" class="main" tabindex="-1">
      <nuxt />
    </main>

    <the-footer class="page-footer sa-hidden" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  setup() {
    const { getFromStorage } = useFavorites()

    const hasUpdate = ref(false)

    const clickToUpdate = () => {
      hasUpdate.value = false
      window.location.reload()
    }

    onMounted(async () => {
      getFromStorage()

      if (!process.client) {
        return
      }
      // @ts-ignore
      const workbox = await window.$workbox
      if (workbox) {
        // @ts-ignore
        workbox.addEventListener('installed', (event) => {
          // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
          if (event.isUpdate) {
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
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
})
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}

.page-header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}

.page-header-top {
  @mixin hide-for-print;
}

.main {
  flex: 1 0 auto;
  min-height: calc(100vh - 1193px);

  @media (--viewport-sm) {
    min-height: calc(100vh - 702px);
  }

  @media (--viewport-lg) {
    min-height: calc(100vh - 486px);
  }
}
</style>

<style lang="postcss">
.transition-to-poster-details {
  & .page-footer,
  & .page-header-top,
  & .page-header {
    contain: paint;
  }

  & .page-footer {
    /* stylelint-disable-next-line */
    page-transition-tag: footer;
  }

  & .page-header-top {
    /* stylelint-disable-next-line */
    page-transition-tag: header-top;
  }

  & .page-header {
    /* stylelint-disable-next-line */
    page-transition-tag: header;
  }
}
</style>
