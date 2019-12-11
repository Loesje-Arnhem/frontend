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
  margin-bottom: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
