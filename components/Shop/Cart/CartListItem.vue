<template>
  <li :class="$style['list-item']">
    <div class="title">
      {{ item.product.node.name }}
    </div>
    <select v-model="quantity" @change="updateItemQuantities">
      <option v-for="index in 9" :key="index" :value="index">
        {{ index }}
      </option>
    </select>
    <div class="price">
      {{ item.total }}
    </div>
    <button @click="removeItemsFromCart">Remove</button>
  </li>
</template>

<script>
import {
  useUpdateItemQuantities,
  useRemoveItemsFromCart,
} from '~/compositions/cart'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { updateItemQuantities, loading, quantity } = useUpdateItemQuantities(
      props.item,
    )
    const { removeItemsFromCart } = useRemoveItemsFromCart(props.item)

    return {
      loading,
      updateItemQuantities,
      quantity,
      removeItemsFromCart,
    }
  },
}
</script>

<style lang="postcss" module>
.list-item {
  display: grid;
  grid-template-columns: auto 5em 6em 6em;
}
</style>
