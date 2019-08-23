<template>
  <div>
    <app-header />
    <main id="content" tabindex="-1">
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
