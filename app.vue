<template>
  <header-top class="page-header-top sa-hidden" />

  <main class="main">
    <NuxtLayout>
      <NuxtLoadingIndicator color="var(--color-black)" />
      <NuxtPage />
    </NuxtLayout>
  </main>
  <the-footer class="page-footer sa-hidden" />
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';
.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}

.page-header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}

.page-header-top {
  @mixin hide-for-print;
}

.main {
  flex: 1 0 auto;
  min-height: calc(100vh - 553px);

  @media (--viewport-sm) {
    min-height: calc(100vh - 702px);
  }

  @media (--viewport-lg) {
    min-height: calc(100vh - 381px);
  }
}
</style>

<style lang="postcss">
.transition-to-poster-details {
  & .page-footer,
  & .page-header-top,
  & .page-header {
    contain: layout;
  }

  & .page-footer {
    /* stylelint-disable-next-line */
    view-transition-name: footer;
  }

  & .page-header-top {
    /* stylelint-disable-next-line */
    view-transition-name: header-top;
  }

  & .page-header {
    /* stylelint-disable-next-line */
    view-transition-name: header;
  }
}
</style>
