<script lang="ts" setup>
import {
  type PageRelatedProductsFragment,
  type PostRelatedProductsFragment,
} from '#gql'

const localePath = useLocalePath()

const props = defineProps<{
  products: PageRelatedProductsFragment | PostRelatedProductsFragment
}>()

const productIds = computed(() => {
  const products =
    props.products.products?.filter(
      (product) => product?.product?.databaseId,
    ) || []
  return products.map((product) => product?.product?.databaseId)
})
</script>

<template>
  <section
    v-if="productIds.length"
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
      <product-list :product-ids="productIds" />
      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('visitOurShop') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
.featured-products {
  padding: 3em 0;
}
</style>
