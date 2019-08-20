<template>
  <header>
    <skip-links />
  </header>
</template>

<script>
import SkipLinks from '@/components/SkipLinks.vue'

export default {
  components: {
    SkipLinks
  },
  data() {
    return {
      showMenu: false
    }
  }
}
</script>
