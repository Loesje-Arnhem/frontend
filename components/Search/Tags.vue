<template>
  <transition-group name="list" tag="ul">
    <li v-for="item in list" :key="item.id" class="list-item">
      <poster-tag :tag="item" />
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
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  @mixin list-reset;
  margin: 0 -0.25rem 1em;
  display: flex;
  flex-wrap: wrap;
}

li {
  margin: 0 0.25rem 0.5rem;
}
</style>
