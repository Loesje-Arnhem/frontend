<script lang="ts" setup>
const { cart, loading } = useCart()
</script>

<template>
  <app-loader v-if="loading" />
  <div v-else>
    <table v-if="cart.contents.nodes.length" class="list table-large">
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
    <p v-else>Je winkelmand is momenteel leeg.</p>

    <ul v-if="cart.appliedCoupons">
      <coupon-list-item
        v-for="(coupon, index) in cart.appliedCoupons"
        :key="coupon?.code ?? index"
        :coupon="coupon"
      />
    </ul>
    <form-coupon v-else />
  </div>
</template>

<style scoped lang="postcss">
.list {
  @mixin list-reset;
}
</style>
