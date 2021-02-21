<template>
  <div :class="$style.gallery">
    <template v-if="images.length > 1">
      <div class="tile" :class="$style['main-image']">
        <ul ref="list" :class="$style.list">
          <li v-for="image in images" :key="image.id" :class="$style.item">
            <app-image
              :src="image.medium"
              :alt="image.altText"
              :class="$style.image"
            />
          </li>
        </ul>
      </div>
      <ul ref="list" :class="$style.thumbs">
        <li
          v-for="(image, index) in images"
          :key="`thumb-${image.id}`"
          class="tile"
          :class="[$style.thumb, { [$style.active]: index === 0 }]"
        >
          <app-image
            :src="image.medium"
            :alt="image.altText"
            :class="$style.image"
          />
        </li>
      </ul>
    </template>
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

.main-image {
  margin-bottom: 0.5em;
}

.item {
  scroll-snap-align: start;
  flex: 0 0 auto;
  width: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbs {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(3, 1fr);
}

.thumb {
  opacity: 0.5;
  transition: opacity var(--animation);

  &.active {
    opacity: 1;
  }
}
</style>
