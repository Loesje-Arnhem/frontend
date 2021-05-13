<template>
  <li :class="$style['list-item']">
    <div>
      <button @click="removeItemsFromCart">
        <app-icon icon="close" title="Verwijderen" />
      </button>
    </div>
    <div class="tile">
      <img :src="item.product.node.image.medium" alt="" :class="$style.image" />
    </div>
    <div class="title">
      {{ item.product.node.name }}
    </div>
    <div :class="$style.price">
      {{ item.total }}
    </div>
    <div :class="$style.select">
      <form-select
        :id="`quantity-${item.product.node.databaseId}`"
        v-model="quantity"
        :name="`quantity-${item.product.node.databaseId}`"
        title="Aantal"
        @change="updateItemQuantities"
      >
        <option v-for="index in 9" :key="index" :value="index">
          {{ index }}
        </option>
      </form-select>
    </div>
    <div :class="$style.price">{{ item.total }}</div>
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
  grid-template-columns: 1.5em 6em auto 4em 5em 4em;
  grid-gap: 0.5em;

  &:not(:last-child) {
    border-bottom: 2px solid #000;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
}

.image {
  display: block;
}

.price {
  text-align: right;
}

.select {
  transform: translateY(-0.4em);

  & :global(label) {
    @mixin sr-only;
  }
}
</style>
