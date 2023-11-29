<script lang="ts" setup>
import { type ProductDetailsFragment } from '~/graphql/__generated__/graphql'

const props = defineProps<{
  product: ProductDetailsFragment
}>()

const gallery = computed(() => {
  const images = []
  if (props.product.featuredImage) {
    images.push(props.product.featuredImage.node)
  }
  if (props.product.galleryImages?.edges.length) {
    const galleryImages = props.product.galleryImages.edges.map((image) => {
      return image.node
    })
    return [...images, ...galleryImages]
  }
  return images
})
</script>

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
      <div class="description" v-html="product.description" />
    </div>
    <!-- <product-list-section :products="product.related" /> -->
  </div>
</template>

<style lang="postcss" scoped>
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
