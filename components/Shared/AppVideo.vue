<script lang="ts" setup>
const props = defineProps<{
  video: string
}>()

const videoThumb = computed(() => {
  return `https://i3.ytimg.com/vi/${props.video}/hqdefault.jpg`
})
const videoUrl = computed(() => {
  return `https://www.youtube.com/watch?v=${props.video}`
})
</script>

<template>
  <div class="wrapper">
    <a
      :href="videoUrl"
      class="video-wrapper"
      rel="noopener"
      target="_blank"
    >
      <app-image
        :src="videoThumb"
        alt=""
        class="image"
        :width="480"
        :height="360"
        sizes="sm:100vw, 300px"
      />
    </a>
    <a
      :href="videoUrl"
      class="btn-video"
      rel="noopener"
      target="_blank"
    >
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
  inset: 38% 23% auto 7%;
  position: absolute;
  display: block;
}

.frame {
  position: relative;
  pointer-events: none;
  display: block;
  width: 100%;
  height: auto;

  & :deep(img) {
    width: 100%;
  }
}

.btn-video {
  position: absolute;
  top: 49%;
  width: 10%;
  left: 82%;
  z-index: 9;
}

.icon-play {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
