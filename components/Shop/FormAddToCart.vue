<template>
  <form class="form" @submit.prevent="addToCart">
    <form-fieldset title="In winkelmandje">
      <form-input-text
        id="quantity"
        v-model="quantity"
        title="Aantal"
        type="number"
        class="quantity"
        name="quantity"
      />

      <div v-if="product.attributes && product.attributes.edges.length">
        <div
          v-for="attribute in product.attributes.edges"
          :key="attribute.node.attributeId"
        >
          <form-select
            :id="attribute.node.name"
            v-model="selectedAttribute"
            :name="attribute.node.name"
            :title="attribute.node.name"
          >
            <option
              v-for="option in attribute.node.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </form-select>
        </div>
      </div>
    </form-fieldset>
    <app-button :disabled="loading" type="submit">In winkelmandje</app-button>
    <div v-if="errors.length" v-html="errors.join(', ')" />
  </form>
</template>

<script>
import { useAddToCart } from '~/compositions/cart'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { addToCart, loading, errors, quantity } = useAddToCart(
      props.product.databaseId,
    )

    return {
      errors,
      loading,
      quantity,
      addToCart,
    }
  },
}
</script>

<style lang="postcss" scoped>
.form {
  & >>> .fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
