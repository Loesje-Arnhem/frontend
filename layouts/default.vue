<template>
  <div :class="$style.page">
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
import TheHeader from '~/components/Layout/TheHeader.vue'
import TheFooter from '~/components/Layout/TheFooter.vue'
import ErrorHandler from '~/components/ErrorHandler.vue'
import HeaderTop from '~/components/HeaderTop.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    ErrorHandler,
    HeaderTop,
  },
}
</script>

<style lang="postcss" module>
.page {
  flex-direction: column;
  display: flex;
  min-height: 100vh;
  position: relative;
}

.header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}

.main {
  flex: 1 1 auto;
}
</style>
