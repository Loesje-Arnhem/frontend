<template>
  <div class="page">
    <header-top class="header-top" />

    <the-header class="header" />
    <main id="content" class="main" tabindex="-1">
      <nuxt />
    </main>
    <the-footer />
    <error-handler />
  </div>
</template>

<script>
import TheHeader from '@/components/Layout/TheHeader.vue'
import TheFooter from '@/components/Layout/TheFooter.vue'
import ErrorHandler from '@/components/ErrorHandler.vue'
import HeaderTop from '@/components/HeaderTop.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    ErrorHandler,
    HeaderTop
  }
}
</script>

<style>
/* .description,
h1,
.products,
.categories,
.header-top,
.header,
header,
footer {
  display: none;
} */
</style>

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
