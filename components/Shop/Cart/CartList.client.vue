<script lang="ts" setup>
const cart = useCartState()
const localePath = useLocalePath()

const loading = ref(false)
</script>

<template>
  <div v-if="cart">
    <div class="cart">
      <table v-if="cart.items.length" class="list table-large">
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
            v-for="item in cart.items"
            :key="item.key"
            :item="item"
            @is-loading="(value) => (loading = value)"
          />
        </tbody>
      </table>
      <p v-else>Je winkelmand is momenteel leeg.</p>
    </div>

    <div class="cart-footer">
      <h2>Totalen winkelwagen</h2>
      <div class="prices">
        <div class="label">Subtotaal</div>

        <div class="value">{{ $n(cart.prices.totalItems, 'currency') }}</div>

        <div class="label">Verzenden</div>
        <div class="value">{{ $n(cart.prices.totalShipping, 'currency') }}</div>
        <div class="label">Totaal</div>
        <div class="value">
          {{ $n(cart.prices.totalPrice, 'currency') }} (inclusief
          {{ $n(cart.prices.totalTax, 'currency') }} BTW)
        </div>
      </div>

      <div class="coupon-form">
        <ul v-if="cart.coupons.length">
          <coupon-list-item
            v-for="coupon in cart.coupons"
            :key="coupon.code"
            :coupon="coupon"
          />
        </ul>
        <form-coupon v-else />
        <app-button
          v-if="cart"
          :to="localePath({ name: 'shop-checkout' })"
          :loading="loading"
        >
          Doorgaan met afrekenen
        </app-button>
      </div>
    </div>
  </div>
  <app-loader v-else />
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
