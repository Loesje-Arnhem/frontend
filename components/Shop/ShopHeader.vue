<template>
  <div :class="$style.header">
    <div :class="$style.promotion">
      <nuxt-link to="/winkeltje/loesje-scheurkalender-2023/">
        De nieuwe scheurkalender
      </nuxt-link>
      is weer te bestellen
    </div>
    <client-only>
      <shop-header-menu />
    </client-only>
  </div>
</template>

<style module lang="postcss">
.header {
  display: flex;
  padding: 0.5em 0;
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
