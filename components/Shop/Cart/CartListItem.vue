<script lang="ts" setup>
import type { Option } from '~/types/Option'
import type { CartItem } from '~/graphql/__generated__/graphql'
import ProductPrices from '../Products/ProductPrices.vue'

const props = defineProps<{
  item: CartItem
}>()

const { mutate: removeItem, loading } = useRemoveItemsFromCart()
const { mutate: updateItemQuantity } = useUpdateItemQuantities()
const quantity = ref(props.item.quantity?.toString() ?? '1')

const removeItemsFromCart = async () => {
  await removeItem({
    keys: [props.item.key ?? ''],
  })
}
const updateQuantity = async () => {
  await updateItemQuantity({
    items: [
      {
        key: props.item.key,
        quantity: Number(quantity.value),
      },
    ],
  })
}

const options: Option[] = [...Array(9).keys()].map((index) => {
  const amount = index + 1
  return {
    value: amount,
    title: amount.toString(),
  }
})
</script>

<template>
  <tr v-if="item?.product">
    <td class="remove-wrapper">
      <app-loader v-if="loading" />
      <button v-else @click="removeItemsFromCart">
        <app-icon icon="close" title="Verwijderen" />
      </button>
    </td>
    <td class="image-wrapper">
      <div class="tile">
        <img class="image" :src="item.product.node.image.medium" alt="" />
      </div>
    </td>
    <td class="title">{{ item.product.node.name }} {{ item.quantity }}</td>

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
        @change="updateQuantity"
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
