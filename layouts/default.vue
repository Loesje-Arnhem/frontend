<template>
  <div :class="$style.page">
    <vue-announcer />
    <header-top :class="$style['header-top']" class="header-top" />
    <the-header :class="$style.header" />
    <main id="content" :class="$style.main" tabindex="-1">
      <nuxt />
    </main>
    <the-footer />
    <error-handler />
  </div>
</template>

<script>
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>

<style lang="postcss" module>
.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}

.header-top {
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
