<template>
  <tr>
    <td :class="$style['remove-wrapper']">
      <button @click="removeItemsFromCart">
        <app-icon icon="close" title="Verwijderen" />
      </button>
    </td>
    <td :class="$style['image-wrapper']">
      <div class="tile">
        <img
          :class="$style.image"
          :src="item.product.node.image.medium"
          alt=""
        />
      </div>
    </td>
    <td class="title">
      {{ item.product.node.name }}
    </td>
    <td :class="$style.price">
      <product-prices :product="item.product.node" />
    </td>
    <td>
      <form-select
        :id="`quantity-${item.product.node.databaseId}`"
        v-model="quantity"
        :class="$style.select"
        :name="`quantity-${item.product.node.databaseId}`"
        title="Aantal"
        @change="updateItemQuantities"
      >
        <option v-for="index in 9" :key="index" :value="index">
          {{ index }}
        </option>
      </form-select>
    </td>
    <td :class="$style.price">{{ item.total }}</td>
  </tr>
</template>

<script>
import ProductPrices from '../Products/ProductPrices.vue'
import {
  useUpdateItemQuantities,
  useRemoveItemsFromCart,
} from '~/composables/cart'

export default {
  components: { ProductPrices },
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
.remove-wrapper {
  width: 1.5em;
}

.image-wrapper {
  width: 8em;
}

.image {
  display: block;
}

.quantity {
  width: 5em;
}

.price {
  width: 8em;
}

.select {
  transform: translateY(-0.4em);

  & :global(label) {
    @mixin sr-only;
  }
}
</style>
