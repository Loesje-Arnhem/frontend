<template>
  <div>
    <ul v-if="cart">
      <li v-for="item in cart.contents.nodes" :key="item.key">
        {{ item.quantity }}x {{ item.product.node.name }} -
        {{ item.total }}
      </li>
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
