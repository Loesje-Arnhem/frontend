<template>
  <center-wrapper>
    <div :class="$style.wrapper">
      <div>
        <product-category-list />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </center-wrapper>
</template>

<script>
import ProductCategoryList from '~/components/Shop/Layout/ProductCategoryList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    ProductCategoryList,
    CenterWrapper,
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  padding: 2em 0 4em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 3fr;
}
</style>
