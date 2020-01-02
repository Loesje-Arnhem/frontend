<template>
  <section
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ $t('title') }}</h1>
      <featured-products-container />
      <app-button to="/winkeltje">{{ $t('btn') }}</app-button>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'
import FeaturedProductsContainer from '~/components/Shop/FeaturedProducts/FeaturedProductsContainer.vue'

export default {
  components: {
    AppButton,
    CenterWrapper,
    FeaturedProductsContainer
  }
}
</script>

<style lang="postcss" module>
.featured-products {
  padding: 3em 0;
}

.title {
  text-align: center;
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
