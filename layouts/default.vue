<template>
  <div class="page">
    <vue-announcer />

    <header-top class="page-header-top" />
    <the-header class="page-header" />
    <main id="content" class="main" tabindex="-1">
      <nuxt />
    </main>
    <the-footer class="page-footer" />
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  setup() {
    const { getFromStorage } = useFavorites()
    onMounted(() => getFromStorage())
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
.transition-to-postear-details {
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
