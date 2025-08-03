<script lang="ts" setup>
import type { IPosterListItem } from "~/types/Content";

defineProps<{
  posters: IPosterListItem[];
}>();
</script>

<template>
  <ul class="list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.id"
      :poster="poster"
    />
  </ul>
</template>

<style scoped>
.list {
  @mixin list-reset;

  margin-bottom: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
