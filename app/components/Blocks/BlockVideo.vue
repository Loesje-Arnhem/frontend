<template>
  <div>
    <button @click="openVideo">Open video</button>
    <video ref="video" :width="640" :height="480" autoplay />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const video: Ref<HTMLVideoElement | null> = ref(null);
    const openVideo = async () => {
      if (!video.value) {
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.value.srcObject = stream;
        video.value.play();
      } catch (error) {
        //
      }
    };
    return {
      video,
      openVideo,
    };
  },
});
</script>
