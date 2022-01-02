<template>
  <app-loader v-if="loading" />
  <div v-else-if="products">
    <ul v-if="products.edges.length" :class="$style.list">
      <product-tile
        v-for="product in products.edges"
        :key="product.node.id"
        :product="product.node"
      />
    </ul>
    <p v-else>Geen producten gevonden</p>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useProducts from '~/composables/useProduct'

export default defineComponent({
  props: {
    where: {
      type: Object,
      default: () => {},
    },
    size: {
      type: Number,
      default: 99,
    },
  },
  setup(props) {
    const { products, loading } = useProducts(props.where, props.size)
    return {
      products,
      loading,
    }
  },
})
</script>

<style module lang="postcss">
.list {
  @mixin list-reset;

  margin: 0 0 1em;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
