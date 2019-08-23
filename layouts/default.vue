<template>
  <div class="page">
    <app-header />
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

export default {
  components: {
    AppHeader,
    AppFooter,
    ErrorHandler
  }
}
</script>

<style lang="postcss" scoped>
.page {
  flex-direction: column;
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1 1 auto;
}
</style>
