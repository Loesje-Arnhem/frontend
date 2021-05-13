<template>
  <nav>
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
import { useCart } from '~/compositions/cart'
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
}
</style>
