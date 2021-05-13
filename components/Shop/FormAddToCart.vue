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

      <div
        v-if="product.globalAttributes && product.globalAttributes.nodes.length"
      >
        <div
          v-for="attribute in product.globalAttributes.nodes"
          :key="attribute.id"
        >
          <form-select
            v-if="attribute.terms.nodes.length"
            :id="attribute.slug"
            v-model="selectedAttribute"
            :name="attribute.slug"
            :title="attribute.name"
          >
            <option
              v-for="option in attribute.terms.nodes"
              :key="option.databaseId"
              :value="option.databaseId"
            >
              {{ option.name }}
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
import { useRouter, useContext, ref } from '@nuxtjs/composition-api'
import { useAddToCart } from '~/compositions/cart'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const selectedAttribute = ref(null)
    const { localePath } = useContext()
    const { addToCart, loading, errors, quantity, onDone } = useAddToCart(
      props.product.databaseId,
    )

    onDone(() => {
      router.push(localePath({ name: 'shop-cart' }))
    })

    return {
      selectedAttribute,
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
