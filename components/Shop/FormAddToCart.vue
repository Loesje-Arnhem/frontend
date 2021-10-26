<template>
  <div class="wrapper">
    <product-prices :product="product" class="price" />

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
          v-if="
            product.globalAttributes && product.globalAttributes.nodes.length
          "
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
      <app-button :disabled="loading" type="submit" class="btn-add-to-cart">
        In winkelmandje
      </app-button>
      <div v-if="errors.length" v-html="errors.join(', ')" />
    </form>
  </div>
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
    grid-gap: 0.5em;
    margin-bottom: 0.5em;
  }

  & >>> .field {
    display: grid;
    grid-template-columns: 5em auto;
    align-items: center;
  }

  & >>> legend {
    @mixin sr-only;
  }
}

.price {
  font-weight: var(--font-weight-bold);
  font-size: 1.1em;
  margin-bottom: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid #000;
}

.wrapper {
  padding: 0.5em 1em 1em;
  background: #eee;
}

.btn-add-to-cart {
  width: 100%;
  max-width: none;
}
</style>
