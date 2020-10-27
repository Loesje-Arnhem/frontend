<template>
  <div :class="$style.page">
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

    onMounted(() => {
      const { header, footer } = refs
      const layoutHeight = header.$el.clientHeight + footer.$el.clientHeight
      mainCSS.value = { 'min-height': `calc(100vh - ${layoutHeight}px)` }
    })

    return {
      mainCSS,
    }
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
