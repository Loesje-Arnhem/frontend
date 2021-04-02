<template>
  <div :class="$style.page">
    <vue-announcer />
    <header-top :class="$style['header-top']" class="header-top" />
    <the-header ref="header" :class="$style.header" />
    <main id="content" :class="$style.main" tabindex="-1" :style="mainCSS">
      <nuxt />
    </main>
    <the-footer ref="footer" />
    <error-handler />
  </div>
</template>

<script>
import { onMounted, ref } from '@nuxtjs/composition-api'

export default {
  setup(_, { refs }) {
    const mainCSS = ref()
    const header = ref(null)
    const footer = ref(null)

    onMounted(() => {
      if (!header.value || !footer.value) {
        return
      }
      const layoutHeight = header.value.clientHeight + footer.value.clientHeight
      mainCSS.value = { 'min-height': `calc(100vh - ${layoutHeight}px)` }
    })

    return {
      mainCSS,
      header,
      footer,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>

<style lang="postcss" module>
.page {
  position: relative;
}

.header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}
</style>
