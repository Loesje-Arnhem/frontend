<template>
  <div :class="$style['shop-header']">
    <div>
      <nuxt-link to="/winkeltje/docentenagenda-2021-2022">
        De nieuwe docentenagenda
      </nuxt-link>
      is weer te bestellen
    </div>
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
  </div>
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
.shop-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  border-bottom: 2px solid var(--color-black);
  margin-bottom: 1em;
}

.list {
  @mixin list-reset;

  display: flex;
  gap: 1em;
}
</style>
