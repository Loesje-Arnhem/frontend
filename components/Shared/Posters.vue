<template>
  <transition-group name="list" tag="ul" class="list">
    <li v-for="poster in posters" :key="poster.id" class="list-item">
      <Poster :poster="poster" />
    </li>
  </transition-group>
</template>

<script>
import Poster from '@/components/Shared/Poster.vue'

export default {
  components: {
    Poster
  },
  props: {
    posters: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.list {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(1em);
}
</style>
