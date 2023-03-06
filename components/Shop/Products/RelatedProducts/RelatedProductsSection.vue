<script lang="ts" setup>
import {
  IProductNode,
  IProducts,
  IRelatedProducts,
} from '~/interfaces/IProduct'

const props = defineProps<{
  relatedProducts: IRelatedProducts
}>()

const products: ComputedRef<IProducts> = computed(() => {
  let edges: IProductNode[] = []
  if (props.relatedProducts.products?.length)
    edges = props.relatedProducts.products.map((product) => {
      return {
        node: product.product,
      }
    })

  return {
    edges,
  }
})
</script>

<template>
  <section
    v-if="products.edges.length"
    aria-labelledby="featured-products"
    class="featured-products"
  >
    <center-wrapper>
      <h1 id="featured-products">
        <template v-if="relatedProducts.title">
          {{ relatedProducts.title }}
        </template>
        <template v-else>
          {{ $t('theShop') }}
        </template>
      </h1>
      <product-list :products="products" />
      <!-- <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button> -->

      <shop-button>
        {{ $t('visitOurShop') }}
      </shop-button>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
.featured-products {
  padding: 3em 0;
}
</style>
