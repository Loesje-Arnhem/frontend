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
        :options="options"
        title="Aantal"
        @change="updateItemQuantities"
      />
    </td>
    <td :class="$style.price">{{ item.total }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ProductPrices from '../Products/ProductPrices.vue'
import {
  useUpdateItemQuantities,
  useRemoveItemsFromCart,
} from '~/composables/cart'
import { IOption } from '~/interfaces/IOption'

export default defineComponent({
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

    const options: IOption[] = [...Array(9).keys()].map((index) => {
      const amount = index + 1
      return {
        value: amount,
        title: amount.toString(),
      }
    })

    return {
      options,
      loading,
      updateItemQuantities,
      quantity,
      removeItemsFromCart,
    }
  },
})
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
