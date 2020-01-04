<template>
  <li v-show="transform" :class="$style['list-item']" :style="{ transform }">
    <poster-tile :poster="poster.node" />
  </li>
</template>

<script>
import PosterTile from '@/components/Poster/PosterTile.vue'

export default {
  components: {
    PosterTile
  },
  props: {
    poster: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      transform: null
    }
  },
  mounted() {
    if (!this.transform) this.generateStyle()
  },
  methods: {
    generateStyle() {
      this.transform = `${this.randomizeRotate()} ${this.randomizeScale()} ${this.randomizeTranslate()}`
    },
    randomize() {
      return Math.floor(Math.random() * 8 - 4)
    },
    randomizeTranslate() {
      const randomize = this.randomize() / 4
      const translateX = randomize
      const translateY = randomize
      return `translate(${translateX}em, ${translateY}em)`
    },
    randomizeScale() {
      const scale = (this.randomize() * 5 + 100) / 100
      return `scale(${scale})`
    },
    randomizeRotate() {
      const rotate = this.randomize()
      return `rotate(${rotate}deg)`
    }
  }
}
</script>

<style lang="postcss" module>
.list-item {
  padding: 0.5em;
  flex: 0 0 10em;
}
</style>
