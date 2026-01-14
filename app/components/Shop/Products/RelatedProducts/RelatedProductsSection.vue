<script lang="ts" setup>
defineProps<{
  title?: string
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
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          {{ $t("theShop") }}
        </template>
      </h1>
      <product-list :product-ids="productIds" />
      <!-- <app-button :to="localePath({ name: 'shop' })"> -->
      <app-button to="https://shop.loesje.nl/winkeltje/">
        {{ $t("visitOurShop") }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<style lang="css" scoped>
.featured-products {
  padding: 3em 0;
}
</style>
