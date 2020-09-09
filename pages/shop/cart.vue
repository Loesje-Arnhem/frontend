<template>
  <div>
    <template v-if="cart">
      <ul>
        <li v-for="item in cart.contents.edges" :key="item.node.id">
          {{ item.node.quantity }}x {{ item.node.product.name }} -
          {{ item.node.total }}
        </li>
      </ul>
      {{ cart.total }}
    </template>
  </div>
</template>

<script>
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'

export default {
  data() {
    return {
      cart: null,
    }
  },

  apollo: {
    cart: {
      query: CartQuery,
    },
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/winkelwagen',
    },
  },
}
</script>
