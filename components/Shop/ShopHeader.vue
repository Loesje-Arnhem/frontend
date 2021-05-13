<template>
  <div :class="$style['shop-header']">
    <div>
      <nuxt-link to="/winkeltje/docentenagenda-2021-2022">
        De nieuwe docentenagenda
      </nuxt-link>
      is weer te bestellen
    </div>
    <client-only>
      <shop-header-menu />
    </client-only>
  </div>
</template>

<style module lang="postcss">
.shop-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  border-bottom: 2px solid var(--color-black);
  margin-bottom: 2em;
}
</style>
