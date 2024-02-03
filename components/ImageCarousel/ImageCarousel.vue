<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  images: FeaturedImage[]
}>()
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="tile">
        <ul ref="list" class="list">
          <li
            v-for="(image, index) in images"
            :key="image.id"
            class="list-item"
          >
            <featured-image
              :image="image"
              class="image"
              :lazy="index > 0"
              sizes="(max-width: 560px) 100vw, (max-width: 560px) 50vw, (max-width: 1024px) 33vw, 460px"
            />
          </li>
        </ul>
      </div>
      <image-carousel-navigation />
    </div>
    <image-carousel-thumbs :images="images" />
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  position: relative;
  margin-bottom: 0.5em;
}

.list {
  @mixin list-reset;

  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.list-item {
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: 100%;
}
</style>
