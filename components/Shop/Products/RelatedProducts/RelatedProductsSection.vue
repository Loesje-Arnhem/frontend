<template>
  <section
    v-if="databaseIds.length"
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">{{ title }}</h1>
      <product-list :where="{ include: databaseIds }" :first="first" />

      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { IRelatedProducts } from '~/interfaces/IRelatedProducts'

export default defineComponent({
  props: {
    relatedProducts: {
      type: Object as PropType<IRelatedProducts>,
      default: () => {},
    },
    first: {
      type: Number,
      default: 99,
    },
  },
  setup(props, { root }) {
    const title = computed(() => {
      // @ts-ignore
      return props.relatedProducts.title || root.$t('title')
    })
    const databaseIds = computed(() => {
      if (props.relatedProducts.products) {
        return props.relatedProducts.products.map(
          (product) => product.product.databaseId,
        )
      }
      return []
    })

    return {
      databaseIds,
      title,
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
