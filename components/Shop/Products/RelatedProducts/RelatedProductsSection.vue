<template>
  <section
    v-if="products.edges.length"
    aria-labelledby="featured-products"
    :class="$style['featured-products']"
  >
    <center-wrapper>
      <h1 id="featured-products">
        <template v-if="relatedProducts.title">
          {{ relatedProducts.title }}
        </template>
        <template v-else>
          {{ $t('title') }}
        </template>
      </h1>
      <product-list :products="products" />
      <app-button :to="localePath({ name: 'shop' })">
        {{ $t('btn') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  ComputedRef,
} from '@nuxtjs/composition-api'
import {
  IProductNode,
  IProducts,
  IRelatedProducts,
} from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    relatedProducts: {
      type: Object as PropType<IRelatedProducts>,
      default: () => {},
    },
  },
  setup(props) {
    const products: ComputedRef<IProducts> = computed(() => {
      let edges: IProductNode[] = []
      if (props.relatedProducts.products?.length)
        edges = props.relatedProducts.products.map((product) => {
          return {
            node: product.product,
          }
        })

      return {
        edges,
      }
    })

    return {
      products,
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
