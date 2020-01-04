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
  computed: {
    translate() {
      const randomizeRange = this.randomizeRange() / 4
      const translateX = randomizeRange
      const translateY = randomizeRange
      return `translate(${translateX}em, ${translateY}em)`
    },
    scale() {
      const scale = (this.randomizeRange() * 5 + 100) / 100
      return `scale(${scale})`
    },
    rotate() {
      const rotate = this.randomizeRange()
      return `rotate(${rotate}deg)`
    }
  },
  mounted() {
    if (!this.transform) this.generateStyle()
  },
  methods: {
    generateStyle() {
      this.transform = `${this.rotate} ${this.scale} ${this.translate}`
    },
    randomizeRange() {
      return Math.floor(Math.random() * 8 - 4)
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
