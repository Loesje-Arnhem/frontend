<template>
  <section class="gallery" aria-labelledby="gallery-title">
    <h1 id="gallery-title" class="sr-only">{{ $t('gallery') }}</h1>
    <div
      v-for="image in images"
      :key="image"
      :width="image.width"
      :height="image.height"
      class="image-wrapper"
      :class="`item-${image.name}`"
    >
      <img
        loading="lazy"
        :src="
          `/media/images/${image.name}.jpg?nf_resize=fit&w=${image.width}&h=${image.height}`
        "
        :srcset="
          `/media/images/${image.name}.jpg?nf_resize=fit&w=${image.width *
            1.5}&h=${image.height * 1.5} 2x`
        "
        alt
      />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: '2', width: 640, height: 960 },
        { name: '3', width: 960, height: 640 },
        { name: '4', width: 960, height: 720 }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.gallery {
  @mixin list-reset;

  display: grid;
  margin: 2em 0 3em;
  grid-gap: 1em;
  /* height: 80vh; */
  grid-template-areas:
    'photo-3 photo-3 photo-2  '
    'photo-4 photo-4 photo-4';
  grid-template-rows: repeat(2, 1fr);

  @media (--viewport-xlg) {
    grid-template-areas: 'photo-3 photo-3 photo-2 photo-4 photo-4';
    grid-template-rows: 1fr;
  }
}

h1 {
  grid-area: title;
  align-self: end;
  margin-bottom: 0;
}

.item-1 {
  display: none;
  grid-area: photo-1;
}

.item-2 {
  grid-area: photo-2;
}

.item-3 {
  grid-area: photo-3;
}

.item-4 {
  grid-area: photo-4;
}

.item-5 {
  grid-area: photo-5;
}

.item-6 {
  grid-area: photo-6;
}

img {
  height: 40vw;
  display: block;
  object-fit: cover;
  width: 100%;

  @media (--viewport-xlg) {
    height: 20vw;
  }
}
</style>
