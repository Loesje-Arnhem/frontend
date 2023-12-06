<script lang="ts" setup>
const localePath = useLocalePath()
const { totalProducts } = useCart()
</script>

<template>
  <nav class="nav">
    <ul class="list">
      <li>
        <nuxt-link :to="localePath({ name: 'shop-account' })">
          Mijn account
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath({ name: 'shop-cart' })">
          Winkelwagenaaa
          {{ totalProducts }}
          <span v-if="totalProducts">({{ totalProducts }})</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.list {
  @mixin list-reset;

  display: flex;
  gap: 1em;
  justify-content: space-between;

  @media (--viewport-md) {
    justify-content: flex-end;
  }
}

.nav {
  flex: 0 1 auto;
}
</style>
