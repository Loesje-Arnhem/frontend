<script lang="ts" setup>
import type { IProduct } from '~/types/Content'
import type { Option } from '~/types/Option'
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
const pending = ref(false)
const errorMessage = ref<string | null>(null)

const addToCart = async () => {
  pending.value = true
  errorMessage.value = null
  console.log('addToCart')

  try {
    const response = await $fetch('/api/cart/addItem', {
      method: 'POST',
      body: {
        id: props.product.id,
        quantity: quantity.value,
        variation: selectedAttributes.value,
      },
    })
    console.log({ response })
    cartState.value = response
    await navigateTo(
      localPath({
        name: 'shop-cart',
      }),
    )
  } catch (error: any) {
    console.log({ error })
    // if (error.FetchError) {
    //   errorMessage.value = error?.FetchError?._data?.statusMessage
    // } else {
    //   errorMessage.value = error.statusMessage
    // }
  } finally {
    pending.value = false
  }
}

const updateSelectedAttribute = (index: number, value: string) => {
  selectedAttributes.value[index].value = value
}

onMounted(() => {
  selectedAttributes.value = props.product.attributes.map((a) => {
    return {
      attribute: a.taxonomy,
      value: a.terms[0].slug,
    }
  })
})

const options: Option[] = [...Array(10).keys()].map((index) => {
  const amount = index + 1
  return {
    value: amount,
    title: amount.toString(),
  }
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
    <app-form
      class="form"
      :error="errorMessage"
      button-title="In winkelmandje"
      :loading="pending"
      @submit="addToCart"
    >
      <form-fieldset title="In winkelmandje">
        <select-field
          id="quantity"
          v-model="quantity"
          class="select"
          :name="quantity"
          :options="options"
          title="Aantal"
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
    </app-form>
  </div>
</template>

<style lang="postcss" scoped>
.form {
  & :deep(.fields) {
    grid-gap: 0.5em;
  }

  & :deep(.field) {
    display: grid;
    grid-template-columns: 5em auto;
    align-items: center;
  }

  & :deep(legend) {
    @mixin sr-only;
  }
  & :deep(button) {
    width: 100%;
    max-width: none;
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
</style>
