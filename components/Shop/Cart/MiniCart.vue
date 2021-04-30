<template>
  <div v-if="cart">
    <h2>Jouw bestelling</h2>
    <table :class="$style.list">
      <thead>
        <tr>
          <th>Product</th>
          <th :class="$style.price">Subtotaal</th>
        </tr>
      </thead>
      <tr v-for="item in cart.contents.nodes" :key="item.key">
        <td>
          <div :class="$style.title">
            <span :class="$style.quantity">{{ item.quantity }}x</span>
            {{ item.product.node.name }}
            {{ item.product.node.name }}
          </div>
        </td>
        <td :class="$style.price">
          {{ item.total }}
        </td>
      </tr>
      <tfoot>
        <tr>
          <td :class="$style.label">Subtotaal</td>
          <td :class="$style.price">{{ cart.subtotal }}</td>
        </tr>
        <template v-if="cart.appliedCoupons">
          <tr v-for="coupon in cart.appliedCoupons" :key="coupon.code">
            <td :class="$style.label">Kortingsbon: {{ coupon.code }}</td>
            <td :class="$style.price">- {{ coupon.discountAmount }}</td>
          </tr>
        </template>
        <tr>
          <td :class="$style.label">Verzending</td>
          <td :class="$style.price">{{ cart.shippingTotal }}</td>
        </tr>
        <tr>
          <td :class="$style.total">Totaal</td>
          <td :class="[$style.price, $style.total]">{{ cart.total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { useCart } from '~/compositions/cart'
export default {
  setup() {
    const { cart, loading } = useCart()

    return {
      loading,
      cart,
    }
  },
}
</script>

<style lang="postcss" module>
.price {
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.title {
  display: flex;
}

.quantity {
  flex: 0 0 auto;
  width: 2em;
}

.total,
.label {
  font-weight: var(--font-weight-bold);
}
</style>
