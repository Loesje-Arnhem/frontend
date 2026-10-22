<script lang="ts" setup>
const props = defineProps<{
  video: string
}>()

const videoThumb = computed(() => {
  return `https://i3.ytimg.com/vi/${props.video}/maxresdefault.jpg`
})

const videoUrl = computed(() => {
  return `https://www.youtube.com/watch?v=${props.video}`
})
</script>

<template>
  <div class="wrapper">
    <nuxt-link
      :to="videoUrl"
      class="video-wrapper"
      target="_blank"
    >
      <app-image
        :src="videoThumb"
        alt=""
        class="image"
        :width="480"
        :height="360"
        sizes="360px"
      />
    </nuxt-link>
    <nuxt-link
      :to="videoUrl"
      class="btn-video"
      target="_blank"
    >
      <app-image
        src="/images/btn-video.png"
        alt="Video afspelen"
        class="icon-play"
        :width="53"
        :height="55"
        sizes="53px"
      />
    </nuxt-link>
    <app-image
      src="/images/television.png"
      class="frame"
      :width="300"
      :height="292"
      sizes="300px"
    />
  </div>
</template>

<style lang="css" scoped>
.image:deep(img) {
  block-size: 100%;
  object-fit: cover;
  filter: sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4);

  & :deep(img) {
    inline-size: 100%;
  }
}

.wrapper {
  position: relative;
  transform: rotate(2deg);
}

.video-wrapper {
  position: absolute;
  inset: 40% 5% 6%;
  display: block;
}

.frame {
  position: relative;
  display: block;
  inline-size: 100%;
  block-size: auto;
  pointer-events: none;

  & :deep(img) {
    inline-size: 100%;
  }
}

.btn-video {
  position: absolute;
  inset-block-start: 49%;
  inset-inline-start: 82%;
  z-index: 9;
  inline-size: 10%;
}

.icon-play {
  display: block;
  inline-size: 100%;
  block-size: 100%;
}
</style>
