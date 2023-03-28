<template>
  <div>
    <div class="product-wrapper">
      <div class="product-details">
        <product-gallery :images="gallery" />
        <div class="content">
          <h1>{{ product.title }}</h1>
          <div v-html="product.shortDescription" />
          <form-add-to-cart :product="product" />
        </div>
      </div>
      <h2>Beschrijving</h2>
      <div
        class="description"
        v-html="product.description"
      />
    </div>
    <product-list-section :products="product.related" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IProduct } from '~/interfaces/IProduct'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props) {
    const gallery = computed(() => {
      const images = []
      if (props.product.featuredImage) {
        images.push(props.product.featuredImage)
      }
      if (props.product.galleryImages.edges.length) {
        return [...images, ...props.product.galleryImages.edges]
      }
      return images
    })
    return {
      gallery,
    }
  },
})
</script>

<style scoped lang="postcss">
.product-wrapper {
  margin-bottom: 3em;
}

.product-details {
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
  align-items: start;
}
</style>
