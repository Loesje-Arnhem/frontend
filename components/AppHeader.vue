<template>
  <header>
    <skip-links />
    <MainNavigation />
  </header>
</template>

<script>
import SkipLinks from '@/components/SkipLinks.vue'
import MainNavigation from '@/components/MainNavigation.vue'

export default {
  components: {
    SkipLinks,
    MainNavigation
  }
}
</script>
