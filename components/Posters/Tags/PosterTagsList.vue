<template>
  <list-animation :class="$style.list">
    <li v-for="item in list" :key="item.node.id" :class="$style['list-item']">
      <poster-tag :tag="item" />
    </li>
  </list-animation>
</template>

<script>
import PosterTag from '~/components/Posters/Tags/PosterTag.vue'
import ListAnimation from '~/components/Animations/ListAnimation.vue'

export default {
  components: {
    PosterTag,
    ListAnimation,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin: 0 -0.25rem 1em;
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  margin: 0 0.25rem 0.5rem;
}
</style>
