<template>
  <div :class="$style.wrapper">
    <div :class="$style['video-wrapper']">
      <iframe
        v-if="start"
        :class="$style.video"
        title="Workshop creatief schrijven met Loesje"
        width="500"
        height="281"
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <img
        v-else
        :src="videoThumb"
        alt=""
        :class="$style.image"
        @click="playVideo"
      />
    </div>
    <button :class="$style['btn-video']" @click="playVideo">
      <img
        src="/images/btn-video.png"
        alt="Video afspelen"
        :class="$style['icon-play']"
      />
    </button>
    <img src="/images/television.png" alt="" :class="$style.frame" />
  </div>
</template>

<script>
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
      return `http://i3.ytimg.com/vi/${props.video}/mqdefault.jpg`
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

<style lang="postcss" module>
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
  max-width: var(--container-width-sm);
  margin: 0 auto 4em;
  transform: rotate(2deg);
}

.video-wrapper {
  top: 37%;
  left: 4%;
  right: 16%;
  position: absolute;
  aspect-ratio: 4 / 3;
}

.frame {
  position: relative;
  pointer-events: none;
  display: block;
  width: 100%;
  height: auto;
}

.btn-video {
  position: absolute;
  top: 50%;
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
