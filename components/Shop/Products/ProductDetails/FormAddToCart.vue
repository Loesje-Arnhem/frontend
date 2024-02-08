<script lang="ts" setup>
import type { IProduct } from '~/types/Content'
const props = defineProps<{
  product: IProduct
}>()

type Attribute = {
  attribute: string
  value: string
}

const cartState = useCartState()

const localPath = useLocalePath()

const quantity = ref(1)
const selectedAttributes = ref<Attribute[]>([])

const { execute, status, error } = useFetch('/api/cart/addItem', {
  method: 'POST',
  body: {
    id: props.product.id,
    quantity: quantity,
    variation: selectedAttributes,
  },
  watch: false,
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

const updateSelectedAttribute = (index: number, value: string) => {
  selectedAttributes.value[index].value = value
}

const addToCart = async () => {
  await execute()
}

onMounted(() => {
  selectedAttributes.value = props.product.attributes.map((a) => {
    return {
      attribute: a.taxonomy,
      value: a.terms[0].slug,
    }
  })
})
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
        <div
          v-if="
            product.attributes.length &&
            selectedAttributes.length === product.attributes.length
          "
        >
          <div
            v-for="(attribute, index) in product.attributes"
            :key="attribute.id"
          >
            <select-field
              :id="attribute.taxonomy"
              :model-value="selectedAttributes[index].value"
              :name="attribute.taxonomy"
              :title="attribute.name"
              :options="
                attribute.terms.map((option) => {
                  return { value: option.slug, title: option.name }
                })
              "
              @change="updateSelectedAttribute(index, $event.target.value)"
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
      <form-error-message :error="error?.statusMessage" />
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
