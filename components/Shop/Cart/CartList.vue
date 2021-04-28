<template>
  <div v-if="cart">
    <ul>
      <cart-list-item
        v-for="item in cart.contents.nodes"
        :key="item.key"
        :item="item"
      />
    </ul>
    {{ cart.total }}
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
