<template>
  <div>
    <div class="product-details">
      <app-image v-if="product.image" :src="product.image.mediumLarge" />
      <div class="content">
        <h1>{{ product.name }}</h1>
        <div class="prices">
          {{ product.regularPrice }} - {{ product.salesPrice }} -
          {{ product.price }}
          {{ product.productId }}
        </div>
        <form-add-to-cart :product="product" />
        <!-- eslint-disable-next-line -->
      <div v-html="product.shortDescription"></div>
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="description" v-html="product.description"></div>
  </div>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'
import FormAddToCart from '~/components/Shop/FormAddToCart.vue'

export default {
  components: {
    AppImage,
    FormAddToCart,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
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
