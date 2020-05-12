<template>
  <section
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ title }}</h1>

      <related-products-container :related-products="relatedProducts">
        <template v-slot="data">
          <product-list v-if="data" :products="data.products" />
        </template>
      </related-products-container>

      <app-button to="/winkeltje">{{ $t('btn') }}</app-button>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import ProductList from '@/components/Shop/ProductList.vue'
import RelatedProductsContainer from '~/components/Shop/FeaturedProducts/FeaturedProductsContainer.vue'

export default {
  components: {
    AppButton,
    CenterWrapper,
    RelatedProductsContainer,
    ProductList,
  },
  props: {
    relatedProducts: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.relatedProducts.title || this.$t('title')
    },
  },
}
</script>

<style lang="postcss" module>
.featured-products {
  padding: 3em 0;
}
</style>

<i18n>
{
  "nl": {
    "title": "Het winkeltje",
    "btn": "Bezoek ons winkeltje"
  }
}
</i18n>
