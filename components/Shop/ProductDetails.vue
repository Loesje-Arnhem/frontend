<template>
  <div class="product-details">
    <app-image v-if="product.image && false" :src="product.image.mediumLarge" />
    <div class="content">
      <h1>{{ product.name }}</h1>
      <div class="prices">
        {{ product.regularPrice }} - {{ product.salesPrice }} -
        {{ product.price }}
        {{ product.productId }}
      </div>
      <p>{{ viewer }}</p>
      {{ cart }}
      <button @click="login">Inloggen</button>
      <!-- eslint-disable-next-line -->
      <!-- <div v-html="product.shortDescription"></div> -->
      <form action @submit.prevent="addToCart">
        <app-button title="submit" type="submit" />
      </form>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="description" v-html="product.description"></div>
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import AddToCartQuery from '~/graphql/AddToCart.gql'
import LoginQuery from '~/graphql/Login.gql'
import ViewerQuery from '~/graphql/Viewer.gql'
import CartQuery from '~/graphql/Cart.gql'

export default {
  components: {
    AppImage,
    AppButton
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      viewer: null,
      cart: null
    }
  },
  apollo: {
    viewer: {
      query: ViewerQuery
    },
    cart: {
      query: CartQuery
    }
  },

  methods: {
    async addToCart() {
      const response = await this.$apollo.mutate({
        mutation: AddToCartQuery,
        variables: {
          input: {
            productId: this.product.productId,
            clientMutationId: 'AddToCart'
          }
        }
      })
      window.console.log(response.data.addToCart)
    },

    async login() {
      try {
        const res = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            login: {
              username: 'michiel',
              password: '8GJYBIMBqF9s*2D#rS',
              clientMutationId: 'login'
            }
          }
        })
        await this.$apolloHelpers.onLogin(res.data.login.authToken)
      } catch (e) {
        window.console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.product-details {
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
}
</style>
