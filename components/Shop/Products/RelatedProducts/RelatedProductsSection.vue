<script lang="ts" setup>
import { RelatedProductsFragment } from '#gql';
import { Endpoints } from '~~/enums/endpoints';

const props = defineProps<{
  relatedProducts: RelatedProductsFragment
}>()

</script>

<template>
  <section
    v-if="relatedProducts.products?.length"
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
      <product-list :products="relatedProducts.products" />
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
