<script lang="ts" setup>
import type { ITag } from '~/types/Content'

defineProps<{
  list: ITag[]
}>()
</script>

<template>
  <ul v-if="list" :class="$style.list">
    <li v-for="item in list" :key="item.id" :class="$style['list-item']">
      <poster-tag :tag="item" />
    </li>
  </ul>
</template>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin: 0 0 1em;
  gap: 0.5em;
  display: flex;
  flex-wrap: wrap;
}
</style>
