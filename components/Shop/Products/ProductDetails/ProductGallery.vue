<template>
  <div class="gallery">
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
        <featured-image
          :image="image"
          class="image"
          :lazy="index > 0"
          sizes="(max-width: 560px) 100vw, (max-width: 560px) 50vw, (max-width: 1024px) 33vw, 460px"
        />
      </carousel-card>
    </app-carousel>
    <div v-else-if="images[0]" class="tile">
      <featured-image
        :image="images[0]"
        class="image"
        :lazy="false"
        sizes="(max-width: 320px) 50vw, 150px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IFeaturedImage } from '~/interfaces/IMedia'

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<IFeaturedImage[]>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.main-image {
  margin-bottom: 0.5em;
}

.image {
  height: 100%;
  object-fit: cover;
}
</style>
