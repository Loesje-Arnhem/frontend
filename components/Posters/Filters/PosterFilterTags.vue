<template>
  <transition-group name="list" tag="ul" :class="$style.list">
    <li
      v-for="item in list"
      :key="item.node.tagId"
      :class="$style['list-item']"
    >
      <poster-tag :tag="item.node" />
    </li>
  </transition-group>
</template>

<script>
import PosterTag from '~/components/Poster/PosterTag.vue'

export default {
  components: {
    PosterTag
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
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
