<script lang="ts" setup>
const { cart } = useCart()
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
      <tr v-for="item in cart.contents.nodes" :key="item.key">
        <td>
          <div class="title">
            <span class="quantity">{{ item.quantity }}x</span>
            {{ item.product.node.name }}
          </div>
        </td>
        <td class="price">
          {{ item.total }}
        </td>
      </tr>
      <tfoot>
        <tr>
          <td class="label">Subtotaal</td>
          <td class="price">
            {{ cart.subtotal }}
          </td>
        </tr>
        <template v-if="cart.appliedCoupons">
          <tr v-for="coupon in cart.appliedCoupons" :key="coupon.code">
            <td class="label">Kortingsbon: {{ coupon.code }}</td>
            <td class="price">- {{ coupon.discountAmount }}</td>
          </tr>
        </template>
        <tr>
          <td class="label">Verzending</td>
          <td class="price">
            {{ cart.shippingTotal }}
          </td>
        </tr>
        <tr>
          <td class="total">Totaal</td>
          <td class="price total">
            {{ cart.total }}
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
