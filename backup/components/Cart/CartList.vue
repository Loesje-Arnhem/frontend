<template>
  <div v-if="cart.contents.nodes.length">
    <table :class="$style.list" class="table-large">
      <thead>
        <tr>
          <th />
          <th />
          <th>Product</th>
          <th>Prijs</th>
          <th>Aantal</th>
          <th>Subtotaal</th>
        </tr>
      </thead>
      <tbody>
        <cart-list-item
          v-for="item in cart.contents.nodes"
          :key="item.key"
          :item="item"
        />
      </tbody>
    </table>
    <ul v-if="cart.appliedCoupons">
      <coupon-list-item
        v-for="coupon in cart.appliedCoupons"
        :key="coupon.code"
        :coupon="coupon"
      />
    </ul>
    <coupon-form v-else />
  </div>
  <p v-else>Je winkelmand is momenteel leeg.</p>
</template>

<script>
import { useCart } from '~/composables/cart'

export default {
  setup() {
    const { cart } = useCart()
    return {
      cart,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/winkelwagen',
    },
  },
}
</script>

<style module lang="postcss">
.list {
  @mixin list-reset;
}
</style>
