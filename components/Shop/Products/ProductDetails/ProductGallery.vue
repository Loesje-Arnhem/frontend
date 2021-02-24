<template>
  <div :class="$style.gallery">
    <app-carousel
      v-if="images.length > 1"
      :total-pages="images.length"
      :thumbs="images"
    >
      <carousel-card
        v-for="(image, index) in images"
        :key="image.id"
        :index="index"
      >
        <app-image
          :src="image.medium"
          :alt="image.altText"
          :class="$style.image"
        />
      </carousel-card>
    </app-carousel>
    <div v-else-if="images[0]" class="tile">
      <app-image
        :src="images[0].mediumLarge"
        :alt="images[0].altText"
        :class="$style.image"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.main-image {
  margin-bottom: 0.5em;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
