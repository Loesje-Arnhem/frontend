<script lang="ts" setup>
import type { IProduct } from '~/types/Content'
const props = defineProps<{
  product: IProduct
}>()

const nonce = useCookie('nonce')
const token = useCookie('token')

const cartState = useCartState()

const localPath = useLocalePath()

const quantity = ref(1)

const { execute, status } = useFetch('/api/cart/addItem', {
  method: 'POST',
  body: {
    id: props.product.id,
    quantity: quantity.value,
  },
  headers: {
    nonce: nonce.value ?? '',
    token: token.value ?? '',
  },
  immediate: false,
  transform: async (response) => {
    cartState.value = response
    await navigateTo(
      localPath({
        name: 'shop-cart',
      }),
    )
  },
})

const addToCart = async () => {
  if (!token.value || !nonce.value) {
    return
  }

  await execute()
}

const selectedAttribute = ref('')
</script>

<template>
  <div class="wrapper">
    <product-prices
      v-if="product.price"
      :price="product.price"
      :regular-price="product.regularPrice"
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
        <div v-if="product.attributes.length">
          <div v-for="attribute in product.attributes" :key="attribute.id">
            <select-field
              :id="attribute.slug"
              v-model="selectedAttribute"
              :name="attribute.slug"
              :title="attribute.name"
              :options="
                attribute.options.map((option) => {
                  return { value: option, title: option }
                })
              "
            />
          </div>
        </div>
      </form-fieldset>
      <app-button
        type="submit"
        class="btn-add-to-cart"
        :loading="status === 'pending'"
      >
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
