<template>
  <div class="header">
    <div class="promotion">
      <nuxt-link to="/winkeltje/loesje-docentenagenda-2024-2025-voorverkoop/">
        De nieuwe docentenagenda
      </nuxt-link>
      is weer te bestellen
    </div>
    <shop-header-menu />
  </div>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.header {
  display: flex;
  padding-bottom: 0.5em;
  border-bottom: 2px solid var(--color-black);
  margin-bottom: 1em;

  @media (--viewport-md) {
    justify-content: space-between;
    display: flex;
  }
}

.promotion {
  display: none;

  @media (--viewport-md) {
    display: block;
  }
}
</style>
