<script lang="ts" setup>
const props = defineProps<{
  video: string;
}>();

const videoThumb = computed(() => {
  return `https://i3.ytimg.com/vi/${props.video}/maxresdefault.jpg`;
});

const videoUrl = computed(() => {
  return `https://www.youtube.com/watch?v=${props.video}`;
});
</script>

<template>
  <div class="wrapper">
    <a :href="videoUrl" class="video-wrapper" rel="noopener" target="_blank">
      <app-image
        :src="videoThumb"
        alt=""
        class="image"
        :width="480"
        :height="360"
        sizes="350px"
      />
    </a>
    <a :href="videoUrl" class="btn-video" rel="noopener" target="_blank">
      <app-image
        src="/images/btn-video.png"
        alt="Video afspelen"
        class="icon-play"
        :width="53"
        :height="55"
        sizes="35px"
      />
    </a>
    <app-image
      src="/images/television.png"
      class="frame"
      :width="300"
      :height="292"
      sizes="350px"
    />
  </div>
</template>

<style scoped>
.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4);
  cursor: pointer;

  & :deep(img) {
    width: 100%;
  }
}

.wrapper {
  position: relative;
  transform: rotate(2deg);
}

.video-wrapper {
  inset: 40% 5% auto;
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
