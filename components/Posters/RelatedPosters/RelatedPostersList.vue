<template>
  <ul :class="$style.list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.node.id"
      :poster="poster.node"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    posters: {
      type: Array as PropType<IRelatedPoster[]>,
      required: true,
    },
  },
})
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin-bottom: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
