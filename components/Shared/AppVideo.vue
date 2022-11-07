<template>
  <div class="wrapper">
    <a :href="videoUrl" class="video-wrapper" rel="noopener" target="_blank">
      <app-image
        :src="videoThumb"
        alt=""
        class="image"
        :width="480"
        :height="360"
        sizes="sm:100vw, 300px"
      />
    </a>
    <a :href="videoUrl" class="btn-video" rel="noopener" target="_blank">
      <app-image
        src="/images/btn-video.png"
        alt="Video afspelen"
        sizes="sm:53px"
        class="icon-play"
        :width="53"
        :height="55"
      />
    </a>
    <app-image
      src="/images/television.png"
      class="frame"
      sizes="sm:100vw, 300px"
      :width="300"
      :height="320"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    video: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const videoThumb = computed(() => {
      return `https://i3.ytimg.com/vi/${props.video}/hqdefault.jpg`
    })
    const videoUrl = computed(() => {
      return `https://www.youtube.com/watch?v=${props.video}`
    })
    return {
      videoThumb,
      videoUrl,
    }
  },
})
</script>

<style lang="postcss" scoped>
.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4);
  cursor: pointer;
}

.wrapper {
  position: relative;
  transform: rotate(2deg);
}

.video-wrapper {
  top: 36%;
  left: 3%;
  right: 15%;
  position: absolute;
  display: block;
  aspect-ratio: 4 / 3;
}

.frame {
  position: relative;
  pointer-events: none;
  display: block;
  width: 100%;
  height: auto;

  & >>> img {
    width: 100%;
  }
}

.btn-video {
  position: absolute;
  top: 49%;
  width: 10%;
  left: 85%;
  z-index: 9;
}

.icon-play {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
