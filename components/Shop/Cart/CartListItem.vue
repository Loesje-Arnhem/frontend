<script lang="ts" setup>
import type { Option } from '~/types/Option'
import type { CartItem } from '~/types/Cart'

const emit = defineEmits(['is-loading'])

const props = defineProps<{
  item: CartItem
}>()

const loading = ref(false)

const quantity = toRef(props.item.quantity)

const errorMessage = ref<string | null>(null)
const cartState = useCartState()

const updateQuantity = async () => {
  emit('is-loading', true)
  errorMessage.value = null

  try {
    const response = await $fetch('/api/cart/updateItem', {
      method: 'POST',
      body: {
        key: props.item.key,
        quantity: quantity.value,
      },
    })
    cartState.value = response
  }
  catch (error: any) {
    errorMessage.value = error.data.data.message
  }
  finally {
    emit('is-loading', false)
  }
}

const max = props.item.quantityMax < 10 ? props.item.quantityMax : 9

const options: Option[] = [...Array(max).keys()].map((index) => {
  const amount = index + 1
  return {
    value: amount,
    title: amount.toString(),
  }
})

const removeItemFromCard = async () => {
  emit('is-loading', true)

  errorMessage.value = null

  try {
    const response = await $fetch('/api/cart/removeItem', {
      method: 'POST',
      body: {
        key: props.item.key,
      },
    })
    cartState.value = response
  }
  catch (error: any) {
    errorMessage.value = error.data.data.message
  }
  finally {
    emit('is-loading', false)
  }
}
</script>

<template>
  <tr>
    <td class="remove-wrapper">
      <app-loader v-if="loading" />
      <button
        v-else
        @click="removeItemFromCard"
      >
        <app-icon
          icon="close"
          title="Verwijderen"
        />
      </button>
    </td>
    <td class="image-wrapper">
      <div
        v-if="item.image"
        class="tile"
      >
        <featured-image
          sizes="200px"
          :image="item.image"
        />
      </div>
    </td>
    <td class="title">
      <cart-title :item="item" />
    </td>

    <td class="price">
      <product-prices
        :price="item.price"
        :regular-price="item.regularPrice"
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
        @change="updateQuantity"
      />
    </td>
    <td class="price">
      {{ $n(item.priceTotal, 'currency') }}
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
