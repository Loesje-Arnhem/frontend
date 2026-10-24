<script lang="ts" setup>
const { data } = await useFetch('/api/menu')
</script>

<template>
  <nav
    id="menu"
    aria-labelledby="menu"
    class="nav"
  >
    <h2 class="sr-only">
      {{ $t("mainMenu") }}
    </h2>
    <ul
      v-if="data?.length"
      class="menu"
    >
      <main-navigation-item
        v-for="item in data"
        :key="item.id"
        class="menu-item-page"
        :item="item"
      />
    </ul>
  </nav>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.nav {
  position: relative;
  margin-block-end: var(--spacing-m);

  @media (--show-full-navigation) {
    margin-block-end: 0;
  }
}

ul {
  @mixin list-reset;

  padding-block-end: 5em;

  @media (--show-full-navigation) {
    display: flex;
    justify-content: space-between;
    padding-block-end: 0;

    &::after {
      position: absolute;
      inset-block-end: 8px;
      inset-inline-start: anchor(left);
      display: block;
      /* stylelint-disable-next-line declaration-property-value-no-unknown */
      inline-size: anchor-size(inline);
      block-size: 3px;
      position-anchor: --active-menu;
      pointer-events: none;
      content: "";
      background: var(--color-white);
      transition:
        left var(--animation),
        width var(--animation);
    }
  }
}

.menu-item-page {
  &:has(.router-link-active) {
    &:deep(> a) {
      anchor-name: --active-menu;
    }
  }
}
</style>
