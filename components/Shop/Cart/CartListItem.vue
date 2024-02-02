<script lang="ts" setup>
import type { Option } from '~/types/Option'
import type { CartItem } from '~/types/Cart'

const props = defineProps<{
  item: CartItem
}>()

const loading = ref(false)
const quantity = toRef(props.item.quantity)

const nonce = useCookie('nonce')
const token = useCookie('token')

const cartState = useCartState()

useFetch('/api/cart/updateItem', {
  method: 'POST',
  body: {
    key: props.item.key,
    quantity: quantity,
  },
  headers: {
    nonce: nonce.value ?? '',
    token: token.value ?? '',
  },
  immediate: false,
  transform: (response) => {
    cartState.value = response
  },
})

const { execute } = useFetch('/api/cart/removeItem', {
  method: 'POST',
  body: {
    key: props.item.key,
  },
  headers: {
    nonce: nonce.value ?? '',
    token: token.value ?? '',
  },
  immediate: false,
  transform: (response) => {
    cartState.value = response
  },
})

const options: Option[] = [...Array(9).keys()].map((index) => {
  const amount = index + 1
  return {
    value: amount,
    title: amount.toString(),
  }
})

const removeItemFromCard = async () => {
  await execute()
}
</script>

<template>
  <tr>
    <td class="remove-wrapper">
      <app-loader v-if="loading" />
      <button v-else @click="removeItemFromCard">
        <app-icon icon="close" title="Verwijderen" />
      </button>
    </td>
    <td class="image-wrapper">
      <div v-if="item.images.length" class="tile">
        <img class="image" :src="item.images[0].src" alt="" />
      </div>
    </td>
    <td class="title">
      <span v-html="item.name" />
      {{ item.quantity }}
    </td>

    <td class="price">
      <product-prices
        :price="Number(item.prices.price) / 100"
        :regular-price="Number(item.prices.regular_price) / 100"
      />
    </td>
    <td>
      <select-field
        :id="`quantity-${item.id}`"
        v-model="quantity"
        class="select"
        :name="`quantity-${item.id}`"
        :options="options"
        title="Aantal"
      />
    </td>
    <td class="price">
      {{ item.totals.line_total }}
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
}
</style>
