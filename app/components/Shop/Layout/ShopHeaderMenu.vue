<script lang="ts" setup>
const localePath = useLocalePath();
const { totalProducts } = useCart();
</script>

<template>
  <nav class="nav">
    <ul class="list">
      <li>
        <nuxt-link :to="localePath({ name: 'shop-cart' })">
          Winkelwagen
          <client-only>
            <span v-if="totalProducts">({{ totalProducts }})</span>
          </client-only>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
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
