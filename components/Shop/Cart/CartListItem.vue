<template>
  <li class="list-item">
    <select v-model="quantity" @change="updateItemQuantities">
      <option v-for="index in 9" :key="index" :value="index">
        {{ index }}
      </option>
    </select>
    {{ item.quantity }}x {{ item.key }} -
    {{ item.total }}
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
