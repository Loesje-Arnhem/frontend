<template>
  <div>
    <div class="product-wrapper">
      <div class="product-details">
        <product-gallery :images="gallery" />
        <div class="content">
          <h1>{{ product.name }}</h1>
          <div v-html="product.shortDescription"></div>
          <form-add-to-cart :product="product" />
        </div>
      </div>
      <h2>Beschrijving</h2>
      <div class="description" v-html="product.description"></div>
    </div>
    <product-list-section :related-products="product.related.edges" />
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    gallery() {
      if (this.product.image) {
        if (this.product.galleryImages.nodes.length) {
          return [this.product.image, ...this.product.galleryImages.nodes]
        }
        return [this.product.image]
      }
      return []
    },
  },
}
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
