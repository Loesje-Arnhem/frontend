<script lang="ts" setup>
const cart = useCartState()
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
            <span v-html="item.name" />
          </div>
        </td>
        <td class="price">
          {{ item.totals.line_total }}
        </td>
      </tr>
      <tfoot>
        <tr>
          <td class="label">Subtotaal</td>
          <td class="price">
            {{ cart.totals.total_items }}
          </td>
        </tr>
        <template v-if="cart.coupons">
          <tr v-for="coupon in cart.coupons" :key="coupon.code">
            <td class="label">Kortingsbon: {{ coupon.code }}</td>
            <td class="price">- {{ coupon.totals.total_discount }}</td>
          </tr>
        </template>
        <tr>
          <td class="label">Verzending</td>
          <td class="price">
            {{ cart.totals.total_shipping }}
          </td>
        </tr>
        <tr>
          <td class="total">Totaal</td>
          <td class="price total">
            {{ cart.totals.total_price }}
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
