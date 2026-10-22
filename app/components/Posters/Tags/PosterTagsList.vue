<script lang="ts" setup>
import type { ITag } from '~/types/Content'

defineProps<{
  list: ITag[]
}>()
</script>

<template>
  <ul
    v-if="list"
    :class="$style.list"
  >
    <li
      v-for="item in list"
      :key="item.id"
      :class="$style['list-item']"
    >
      <poster-tag :tag="item" />
    </li>
  </ul>
</template>

<style module>
.list {
  @mixin list-reset;

  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0 0 1em;
}
</style>
