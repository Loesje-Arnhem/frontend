<template>
  <center-wrapper>
    <transition-group name="list" tag="ul" :class="$style.list">
      <li v-for="item in list" :key="item.node.id" :class="$style['list-item']">
        <poster-tag :tag="item" />
      </li>
    </transition-group>
  </center-wrapper>
</template>

<script>
import PosterTag from '~/components/Poster/PosterTag.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PosterTag,
    CenterWrapper,
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
