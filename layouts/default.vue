<template>
  <notch-wrapper>
    <app-header />
    <nuxt />
    <app-footer />
    <error-handler />
  </notch-wrapper>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ErrorHandler from '@/components/ErrorHandler.vue'
import NotchWrapper from '@/components/NotchWrapper.vue'

export default {
  components: {
    NotchWrapper,
    AppHeader,
    AppFooter,
    ErrorHandler
  }
}
</script>
