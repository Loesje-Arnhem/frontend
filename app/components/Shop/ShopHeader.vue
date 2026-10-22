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

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.header {
  display: flex;
  padding: 0.5em 0;
  margin-block-end: 1em;
  border-block-end: 2px solid var(--color-black);

  @media (--viewport-md) {
    display: flex;
    justify-content: space-between;
  }
}

.promotion {
  display: none;

  @media (--viewport-md) {
    display: block;
  }
}
</style>
