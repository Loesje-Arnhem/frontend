<template>
  <div v-if="cart">
    <ul :class="$style.list">
      <cart-list-item
        v-for="item in cart.contents.nodes"
        :key="item.key"
        :item="item"
      />
    </ul>
    <ul v-if="cart.appliedCoupons">
      <coupon-list-item
        v-for="coupon in cart.appliedCoupons"
        :key="coupon.code"
        :coupon="coupon"
      />
    </ul>
    <coupons v-else />
  </div>
</template>

<script>
import { useCart } from '~/compositions/cart'

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
