<template>
  <div :class="$style.wrapper">
    <img v-if="image" :src="image" alt="" :class="$style.image" />
    <img src="/images/photoframe.png" alt="" :class="$style.frame" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    image: {
      type: String,
      default: null,
    },
  },
})
</script>

<style lang="postcss" module>
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
