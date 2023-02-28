<template>
  <div class="page">
    <vue-announcer />
    <window-controls-overlay />
    <header-top class="page-header-top sa-hidden" />
    <the-header class="page-header sa-hidden" />

    <main id="content" class="main" tabindex="-1">
      <nuxt />
    </main>

    <the-footer class="page-footer sa-hidden" />
    <client-only>
      <pwa-update />
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import PwaUpdate from '~/components/Shared/PwaUpdate.vue'
import useFavorites from '~/composables/useFavorites'
import usePwa from '~/composables/usePwa'

export default defineComponent({
  components: { PwaUpdate },
  setup() {
    const { addInstallListener, installEvent } = usePwa()
    const { getFromStorage } = useFavorites()

    onMounted(() => {
      getFromStorage()
      addInstallListener()
    })
    return {
      installEvent,
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
  min-height: calc(100vh - 553px);

  @media (--viewport-sm) {
    min-height: calc(100vh - 702px);
  }

  @media (--viewport-lg) {
    min-height: calc(100vh - 381px);
  }
}
</style>

<style lang="postcss">
.transition-to-poster-details {
  & .page-footer,
  & .page-header-top,
  & .page-header {
    contain: layout;
  }

  & .page-footer {
    /* stylelint-disable-next-line */
    view-transition-name: footer;
  }

  & .page-header-top {
    /* stylelint-disable-next-line */
    view-transition-name: header-top;
  }

  & .page-header {
    /* stylelint-disable-next-line */
    view-transition-name: header;
  }
}
</style>
