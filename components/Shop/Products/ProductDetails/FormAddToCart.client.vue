<script lang="ts" setup>
import type { ProductDetailsFragment } from '#gql'

const cartFragment = gql`
  fragment cartFragment on Cart {
    contents {
      nodes {
        key
        product {
          node {
            id
            databaseId
            name
            image {
              id
              altText
              thumbnail: sourceUrl(size: THUMBNAIL)
              medium: sourceUrl(size: MEDIUM)
              mediumLarge: sourceUrl(size: MEDIUM_LARGE)
            }
            ... on SimpleProduct {
              id
              regularPrice
              price
              salePrice
            }
            ... on VariableProduct {
              id
              regularPrice
              price
              salePrice
            }
          }
        }
        variation {
          node {
            id
            databaseId
            name
            description
            type
            onSale
            price
            regularPrice
            salePrice
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
          }
          attributes {
            id
            name
            value
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      discountAmount
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
  }
`

const query = gql`
  query GET_CART {
    cart {
      ...cartFragment
    }
  }
  ${cartFragment}
`

const mutation = gql`
  mutation ADD_TO_CART($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        ...cartFragment
      }
    }
  }
  ${cartFragment}
`

const props = defineProps<{
  product: ProductDetailsFragment
}>()

const { mutate, loading, onError, onDone } = useMutation(mutation, () => ({
  variables: {
    productId: props.product.databaseId,
    quantity: 1,
  },
  update(cache: any, { data }: any) {
    updateCartCache(cache, data?.addToCart)
  },
}))

const updateCartCache = (cache: any, data: any) => {
  // https://www.apollographql.com/blog/when-to-use-refetch-queries-in-apollo-client/
  // We use an update function here to write the
  // new value of the Cart query.
  const cart = data?.cart

  if (cart) {
    cache.writeQuery({
      query,
      data: {
        cart,
      },
    })
  }
}

// export default {
//   props: {
//     product: {
//       type: Object,
//       required: true,
//     },
//   },
//   setup(props) {
//     const router = useRouter()
//     const selectedAttribute = ref(null)
//     const { localePath } = useContext()
//     const { addToCart, loading, errors, quantity, onDone } = useAddToCart(
//       props.product.databaseId,
//     )

//     onDone(() => {
//       navigateTo(localePath({ name: 'shop-cart' }))
//     })

//     return {
//       selectedAttribute,
//       errors,
//       loading,
//       quantity,
//       addToCart,
//     }
//   },
// }

const { result } = useQuery(query)

// if (data.value) {
//   // log response
//   console.log(data.value)
// }
</script>

<template>
  <div class="wrapper">
    <product-prices :product="product" class="price" />
    data ={{ result }}
    <button @click="mutate">mutate</button>
    <app-loader v-if="loading" />
    {{ cartBlock }}
    <!-- 
    <form
      class="form"
      @submit.prevent="addToCart"
    >
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
              :options="
                attribute.terms.nodes.map((o) => {
                  return { value: o.databaseId, title: o.name }
                })
              "
            />
          </div>
        </div>
      </form-fieldset>
      <app-button
        :disabled="loading"
        type="submit"
        class="btn-add-to-cart"
      >
        In winkelmandje
      </app-button>
      <div
        v-if="errors.length"
        v-html="errors.join(', ')"
      />
    </form>
  </div> -->
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
