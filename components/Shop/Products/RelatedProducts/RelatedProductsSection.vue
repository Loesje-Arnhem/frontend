<script lang="ts" setup>
const localePath = useLocalePath()

defineProps<{
  productIds: number[]
}>()
</script>

<template>
  <section
    v-if="productIds.length"
    aria-labelledby="featured-products"
    class="featured-products"
  >
    <center-wrapper>
      <h1 id="featured-products">
        <!-- <template v-if="products.title">
          {{ products.title }}
        </template> -->
        <!-- <template v-else> -->
        {{ $t('theShop') }}
        <!-- </template> -->
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
