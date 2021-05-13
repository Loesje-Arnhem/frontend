<template>
  <center-wrapper>
    <shop-header />
    <div :class="$style.wrapper">
      <div :class="$style['categories-column']">
        <product-category-list :class="$style.categories" />
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

  @media (--viewport-lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.categories-column {
  position: relative;
}

.categories {
  position: sticky;
  top: 4.5em;
}
</style>
