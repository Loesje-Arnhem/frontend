<template>
  <center-wrapper>
    <div :class="$style.wrapper">
      <div>
        <ul v-if="cart.contents">
          <li v-for="item in cart.contents.edges" :key="item.node.id">
            {{ item.node.name }}
          </li>
        </ul>
        {{ cart }}
        <product-category-list />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </center-wrapper>
</template>

<script>
import ProductCategoryList from '~/components/Shop/Layout/ProductCategoryList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import CartQuery from '~/graphql/Cart.gql'

export default {
  components: {
    ProductCategoryList,
    CenterWrapper,
  },

  apollo: {
    cart: {
      query: CartQuery,
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  padding: 2em 0 4em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 3fr;
}
</style>
