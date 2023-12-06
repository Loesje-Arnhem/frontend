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
      <tfoot>
        <tr>
          <td colspan="6"><h2>Totalen winkelwagen</h2></td>
        </tr>
        <tr>
          
          <td colspan="6">Subtotaal {{ cart.contents.subtotal }}</td>
          
        </tr>
      </tfoot>
    </table>
    {{ cart }}
    <ul v-if="cart.appliedCoupons">
      <coupon-list-item
        v-for="coupon in cart.appliedCoupons"
        :key="coupon.code"
        :coupon="coupon"
      />
    </ul>
    <coupon-form v-else />

Subtotaal 	€38.43
Verzending 	

    Vast Tarief: €3.94	

Verzenden naar Bevrijdingsstraat 10, 6703 AA Wageningen.
Adres wijzigen
Totaal 	€42.37 (inclusief €4.23 BTW 21%, €1.48 BTW 9%)
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
