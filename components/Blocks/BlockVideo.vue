<template>
  <div>
    <button @click="openVideo">Open video</button>
    <video ref="video" width="640" height="480" autoplay></video>
  </div>
</template>

<script>
export default {
  methods: {
    async openVideo() {
      const { video } = this.$refs
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        video.srcObject = stream
        video.play()
      } catch (error) {}
    },
  },
}
</script>
