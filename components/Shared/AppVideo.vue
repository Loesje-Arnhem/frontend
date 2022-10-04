<template>
  <div class="wrapper">
    <div class="video-wrapper">
      <iframe
        v-if="start"
        class="video"
        title="Workshop creatief schrijven met Loesje"
        width="500"
        height="281"
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <app-image
        v-else
        :src="videoThumb"
        alt=""
        class="image"
        :width="480"
        :height="360"
        sizes="sm:100vw, 300px"
        @click="playVideo"
      />
    </div>
    <button class="btn-video" @click="playVideo">
      <app-image
        src="/images/btn-video.png"
        alt="Video afspelen"
        sizes="sm:53px"
        class="icon-play"
        :width="53"
        :height="55"
      />
    </button>
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
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    video: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const start = ref(false)
    const playVideo = () => {
      start.value = true
    }
    const videoThumb = computed(() => {
      return `https://i3.ytimg.com/vi/${props.video}/hqdefault.jpg`
    })
    const videoUrl = computed(() => {
      return `https://www.youtube.com/embed/${props.video}?feature=oembed&autoplay=1&showinfo=0`
    })
    return {
      videoThumb,
      videoUrl,
      start,
      playVideo,
    }
  },
})
</script>

<style lang="postcss" scoped>
.image,
.video {
  display: block;
  width: 100%;
  height: 100%;
}

.image {
  object-fit: cover;
  filter: sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4);
  cursor: pointer;
}

.wrapper {
  position: relative;
  transform: rotate(2deg);
}

.video-wrapper {
  top: 24%;
  left: 3%;
  right: 15%;
  position: absolute;
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
  top: 33%;
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
