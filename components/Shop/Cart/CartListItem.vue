<script lang="ts" setup>
// import { defineComponent } from '@nuxtjs/composition-api'
import type { IOption } from '~/types/IOption'
import ProductPrices from '../Products/ProductPrices.vue'
// import { IOption } from '~/interfaces/IOption'

defineProps<{
  item: Object
}>()

const removeItemsFromCart = () => {}
const updateItemQuantities = () => {}

const quantity = ref(1)
// const loading = ref(false)

// export default defineComponent({
//   components: { ProductPrices },
//   props: {
//     item: {
//       type: Object,
//       required: true,
//     },
//   },
//   setup(props) {
//     const { updateItemQuantities, loading, quantity } = useUpdateItemQuantities(
//       props.item,
//     )
//     const { removeItemsFromCart } = useRemoveItemsFromCart(props.item)

const options: IOption[] = [...Array(9).keys()].map((index) => {
  const amount = index + 1
  return {
    value: amount,
    title: amount.toString(),
  }
})

//     return {
//       options,
//       loading,
//       updateItemQuantities,
//       quantity,
//       removeItemsFromCart,
//     }
//   },
// })
</script>

<template>
  <tr>
    <td class="remove-wrapper">
      <button @click="removeItemsFromCart">
        <app-icon icon="close" title="Verwijderen" />
      </button>
    </td>
    <td class="image-wrapper">
      <div class="tile">
        <img class="image" :src="item.product.node.image.medium" alt="" />
      </div>
    </td>
    <td class="title">
      {{ item.product.node.name }}
    </td>
    <td class="price">
      <product-prices :product="item.product.node" />
    </td>
    <td>
      <form-select
        :id="`quantity-${item.product.node.databaseId}`"
        v-model="quantity"
        class="select"
        :name="`quantity-${item.product.node.databaseId}`"
        :options="options"
        title="Aantal"
        @change="updateItemQuantities"
      />
    </td>
    <td class="price">
      {{ item.total }}
    </td>
  </tr>
</template>

<style lang="postcss" scoped>
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
