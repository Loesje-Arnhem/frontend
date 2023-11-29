<script lang="ts" setup>
import type { FeaturedImageFragment } from '~/graphql/__generated__/graphql'

defineProps<{
  image: FeaturedImageFragment
}>()
</script>

<template>
  <div class="photo-wrapper">
    <featured-image
      :lazy="false"
      :image="image.node"
      class="featured-image"
      sizes="(max-width: 320px) 80vw, 280px"
    />

    <app-image
      src="/images/photoframe.png"
      :lazy="false"
      class="frame"
      :width="355"
      :height="456"
    />
  </div>
</template>

<style lang="postcss" scoped>
.photo-wrapper {
  position: relative;
  transform: rotate(2deg);
}

.frame {
  position: relative;
}

.featured-image {
  position: absolute;
  top: 11%;
  left: 17%;
  width: 68%;
  aspect-ratio: 24 / 36;
  object-fit: cover;
}
</style>
