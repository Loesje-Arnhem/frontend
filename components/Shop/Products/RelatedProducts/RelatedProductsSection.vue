<template>
  <section
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ title }}</h1>
      <product-list :where="where" :size="size" />

      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
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
  setup(props, { root }) {
    const title = computed(() => {
      return props.relatedProducts.title || root.$t('title')
    })
    const databaseIds = computed(() => {
      if (props.relatedProducts.relatedProductsProducts) {
        return props.relatedProducts.relatedProductsProducts.map(
          (product) => product.product.databaseId,
        )
      }
      return []
    })

    const where = computed(() => {
      return {
        include: databaseIds.value,
      }
    })
    return {
      title,
      where,
    }
  },
})
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
