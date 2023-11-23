<script lang="ts" setup>
const { cart } = useCart()
</script>

<template>
  <div v-if="cart?.contents.nodes.length">
    <table class="list table-large">
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
    <!-- <ul v-if="cart.appliedCoupons">
      <coupon-list-item
        v-for="coupon in cart.appliedCoupons"
        :key="coupon.code"
        :coupon="coupon"
      />
    </ul> -->
    <!-- <coupon-form v-else /> -->
  </div>
  <p v-else>Je winkelmand is momenteel leeg.</p>
</template>

<style scoped lang="postcss">
.list {
  @mixin list-reset;
}
</style>
