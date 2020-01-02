<template>
  <ul :class="$style.list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.node.id"
      :poster="poster"
      :class="$style['list-item']"
    />
  </ul>
</template>

<script>
import RelatedPostersListItem from '@/components/Posters/RelatedPosters/RelatedPostersListItem.vue'

export default {
  components: {
    RelatedPostersListItem
  },
  props: {
    posters: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;
  margin-bottom: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list-item {
  &:nth-child(1) {
    transform: rotate(2deg) scale(1.2) translate(0.5em, 1.2em);
  }
  &:nth-child(2) {
    transform: rotate(-1deg) scale(0.9) translate(1.2em, -1em);
  }
  &:nth-child(3) {
    transform: rotate(1deg) scale(1.1) translate(0.5em, 1em);
  }
  &:nth-child(4) {
    transform: rotate(3deg) scale(1) translate(-0.5em, -1em);
  }
  &:nth-child(5) {
    transform: rotate(-0.5deg) scale(1.1) translate(0.1em, 0.5em);
  }
}
</style>
