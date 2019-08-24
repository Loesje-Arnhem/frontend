<template>
  <div class="page">
    <daily-poster />

    <app-header class="header" />
    <main id="content" class="main" tabindex="-1">
      <nuxt />
    </main>
    <app-footer />
    <error-handler />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ErrorHandler from '@/components/ErrorHandler.vue'
import DailyPoster from '@/components/DailyPoster.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    ErrorHandler,
    DailyPoster
  }
}
</script>

<style lang="postcss" scoped>
.page {
  flex-direction: column;
  display: flex;
  min-height: 100vh;
  position: relative;
}

.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-main-navigation);
}

.main {
  flex: 1 1 auto;
}
</style>
