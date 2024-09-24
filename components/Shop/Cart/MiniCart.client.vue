<script lang="ts" setup>
const cart = useCartState();
</script>

<template>
  <div v-if="cart">
    <h2>Jouw bestelling</h2>
    <table class="list">
      <thead>
        <tr>
          <th>Product</th>
          <th class="price">Subtotaal</th>
        </tr>
      </thead>
      <tr v-for="item in cart.items" :key="item.key">
        <td>
          <div class="title">
            <span class="quantity">{{ item.quantity }}x</span>
            <cart-title :item="item" />
          </div>
        </td>
        <td class="price">
          {{ $n(item.priceTotal, "currency") }}
        </td>
      </tr>
      <tfoot>
        <tr>
          <td class="label">Subtotaal</td>
          <td class="price">
            {{ $n(cart.prices.totalItems, "currency") }}
          </td>
        </tr>
        <template v-if="cart.coupons">
          <tr v-for="coupon in cart.coupons" :key="coupon.code">
            <td class="label">Kortingsbon: {{ coupon.code }}</td>
            <td class="price">- {{ $n(coupon.price, "currency") }}</td>
          </tr>
        </template>
        <tr>
          <td class="label">Verzending</td>
          <td class="price">
            {{ $n(cart.prices.totalShipping, "currency") }}
          </td>
        </tr>
        <tr>
          <td class="total">Totaal</td>
          <td class="price total">
            {{ $n(cart.prices.totalPrice, "currency") }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style lang="postcss" scoped>
.price {
  font-variant-numeric: tabular-nums;
  text-align: right;
}

td {
  padding-block: 0.25em;
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
