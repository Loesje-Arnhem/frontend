<template>
  <ul :class="$style.list">
    <li v-for="item in list" :key="item.node.id" :class="$style['list-item']">
      <poster-tag :tag="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ITag } from '~/interfaces/ITag'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ITag[]>,
      default: () => [],
    },
  },
})
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin: 0 0 1em;
  gap: 0.5em;
  display: flex;
  flex-wrap: wrap;
}
</style>
