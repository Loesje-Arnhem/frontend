<script lang="ts" setup>
import type { IProduct } from '~/types/Content'

const props = defineProps<{
  product: IProduct
}>()

// const { addToCart, loading, quantity, errors, onDone } = useAddToCart(
//   props.product.databaseId,
// )

// onDone(() => {
//   navigateTo(localePath({ name: 'shop-cart' }))
// })

const addToCart = () => {}

const loading = ref(false)
const quantity = ref(1)

const selectedAttribute = ref('')
</script>

<template>
  <div class="wrapper">
    <product-prices
      v-if="product.price"
      :price="product.price"
      :regularPrice="product.regularPrice"
      class="price"
    />
    <form class="form" @submit.prevent="addToCart">
      <form-fieldset title="In winkelmandje">
        <input-text-field
          id="quantity"
          v-model="quantity"
          title="Aantal"
          type="number"
          class="quantity"
          name="quantity"
        />
        <!-- <div
          v-if="
            product.globalAttributes && product.globalAttributes.nodes.length
          "
        >
          {{ selectedAttribute }}
          <div
            v-for="attribute in product.globalAttributes.nodes"
            :key="attribute.id"
          >
            <select-field
              v-if="attribute.terms?.nodes.length"
              :id="attribute.slug"
              v-model="selectedAttribute"
              :name="attribute.slug"
              :title="attribute.name"
              :options="
                attribute.terms.nodes.map((o) => {
                  return { value: o.databaseId, title: o.name }
                })
              "
            />
          </div>
        </div> -->
      </form-fieldset>
      <app-button type="submit" class="btn-add-to-cart" :loading="loading">
        In winkelmandje
      </app-button>
      <!-- <div v-if="errors.length" v-html="errors.join(', ')" /> -->
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.form {
  & :deep(.fields) {
    grid-gap: 0.5em;
    margin-bottom: 0.5em;
  }

  & :deep(.field) {
    display: grid;
    grid-template-columns: 5em auto;
    align-items: center;
  }

  & :deep(legend) {
    @mixin sr-only;
  }
}

.price {
  font-weight: var(--font-weight-bold);
  font-size: 1.1em;
  margin-bottom: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid var(--color-black);
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
