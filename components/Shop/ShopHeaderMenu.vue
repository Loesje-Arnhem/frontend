<template>
  <nav :class="$style.nav">
    <ul :class="$style.list">
      <li>
        <nuxt-link :to="localePath({ name: 'shop-cart' })">
          Mijn account
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath({ name: 'shop-cart' })">
          Winkelwagen
          <span v-if="totalProducts">({{ totalProducts }})</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useCart } from '~/composables/cart'
export default {
  setup() {
    const { totalProducts } = useCart()
    return {
      totalProducts,
    }
  },
}
</script>

<style module lang="postcss">
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
  flex: 1 1 auto;
}
</style>
