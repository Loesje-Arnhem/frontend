<script lang="ts" setup>
const { cart, loading } = useCart()
const localePath = useLocalePath()
</script>

<template>
  <app-loader v-if="loading" />
  <div v-else>
    <div class="cart">
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
    </div>

    <div class="cart-footer">
      <h2>Totalen winkelwagen</h2>
      <div class="prices">
        <div class="label">Subtotaal</div>

        <div class="value">{{ cart.subtotal }}</div>

        <div class="label">Verzenden</div>
        <div class="value">{{ cart.shippingTotal }}</div>
        <div class="label">Totaal</div>
        <div class="value">
          {{ cart.total }} (inclusief {{ cart.totalTax }} BTW 21%)
        </div>
      </div>

      <div class="coupon-form">
        <ul v-if="cart.appliedCoupons">
          <coupon-list-item
            v-for="(coupon, index) in cart.appliedCoupons"
            :key="coupon?.code ?? index"
            :coupon="coupon"
          />
        </ul>
        <form-coupon v-else />
        <app-button v-if="cart" :to="localePath({ name: 'shop-checkout' })">
          Doorgaan met afrekenen
        </app-button>
      </div>
    </div>
    {{ cart }}
  </div>
</template>

<style scoped lang="postcss">
@import '~/assets/css/media-queries/media-queries.css';

.cart {
  margin-bottom: var(--spacing-l);
}

.list {
  @mixin list-reset;
}

.cart-footer {
  @media (--viewport-sm) {
    padding-left: 50%;
  }
}

.prices {
  display: grid;
  grid-template-columns: 5em auto;
  column-gap: var(--spacing-s);
  margin-bottom: var(--spacing-m);
}
</style>
