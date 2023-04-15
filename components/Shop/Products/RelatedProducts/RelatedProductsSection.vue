<script lang="ts" setup>
import { PageRelatedProductsFragment, PostRelatedProductsFragment } from '#gql';

 defineProps<{
  products: PageRelatedProductsFragment | PostRelatedProductsFragment
}>()

</script>

<template>
  <section
    v-if="products.products?.length"
    aria-labelledby="featured-products"
    class="featured-products"
  >
    <center-wrapper>
      <h1 id="featured-products">
        <template v-if="products.title">
          {{ products.title }}
        </template>
        <template v-else>
          {{ $t('theShop') }}
        </template>
      </h1>
      <product-list :products="products.products" />
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
