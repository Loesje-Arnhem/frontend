<template>
  <form @submit.prevent="addToCart" class="form">
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
              >{{ option }}</option
            >
          </form-select>
        </div>
      </div>
    </form-fieldset>
    <app-button type="submit">In winkelmandje</app-button>
  </form>
</template>

<script>
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import AddToCartQuery from '~/graphql/AddToCart.gql'
import FormSelect from '@/components/Forms/FormSelect.vue'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText,
    FormSelect
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedAttribute: null,
      quantity: 1
    }
  },
  methods: {
    async addToCart() {
      const response = await this.$apollo.mutate({
        mutation: AddToCartQuery,
        variables: {
          input: {
            productId: this.product.productId,
            clientMutationId: 'AddToCart',
            quantity: this.quantity
          }
        }
      })
      window.console.log(response.data.addToCart)
    }
  }
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;
  & >>> .fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
