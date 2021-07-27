<template>
  <section
    v-if="databaseIds.length"
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ title }}</h1>
      <products-container :database-ids="databaseIds" :size="size">
        <template #default="data">
          <product-list v-if="data" :products="data.products" />
        </template>
      </products-container>

      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import ProductList from '~/components/Shop/Products/Shared/ProductList.vue'
import ProductsContainer from '~/components/Shop/Products/Data/ProductsContainer.vue'

export default {
  components: {
    AppButton,
    CenterWrapper,
    ProductsContainer,
    ProductList,
  },
  props: {
    relatedProducts: {
      type: Object,
      default: () => {},
    },
    size: {
      type: Number,
      default: 99,
    },
  },
  computed: {
    title() {
      return this.relatedProducts.title || this.$t('title')
    },
    databaseIds() {
      if (this.relatedProducts.relatedProductsProducts) {
        return this.relatedProducts.relatedProductsProducts.map(
          (product) => product.product.databaseId,
        )
      }
      return []
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
