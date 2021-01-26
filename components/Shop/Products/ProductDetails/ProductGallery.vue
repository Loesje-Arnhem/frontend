<template>
  <div :class="$style.gallery" class="tile">
    <ul v-if="images.length > 1" ref="list" :class="$style.list">
      <li v-for="image in images" :key="image.id" :class="$style.item">
        <app-image
          :src="image.medium"
          :alt="image.altText"
          :class="$style.image"
        />
      </li>
    </ul>
    <app-image
      v-else-if="images[0]"
      :src="images[0].mediumLarge"
      :alt="images[0].altText"
      :class="$style.image"
    />
  </div>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'

export default {
  components: {
    AppImage,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
}

.item {
  scroll-snap-align: start;
  flex: 0 0 100%;
  width: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
