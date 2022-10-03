<template>
  <div class="wrapper">
    <img :src="image" alt="" class="image" crossorigin />

    <app-image
      src="/images/photoframe.png"
      :lazy="false"
      class="frame"
      :width="355"
      :height="456"
      sizes="xs:100vw md:355px lg:710px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    image: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="postcss" scoped>
.wrapper {
  position: relative;
  max-width: var(--container-width-sm);
  margin: 0 auto 4em;
  transform: rotate(2deg);
}

.frame {
  position: relative;
  pointer-events: none;
  display: block;
  width: 100%;
}

.image {
  position: absolute;
  display: block;
  top: 10%;
  left: 16%;
  width: 71%;
  height: 80%;
  object-fit: cover;
}
</style>
