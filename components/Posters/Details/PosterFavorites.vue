<script lang="ts" setup>
import type { IPoster } from "~/types/Content";

const props = defineProps<{
  poster: IPoster;
}>();
const favorites = useFavoriteIds();

const { add, remove } = useFavorites();

const isInFavorites = computed(() => {
  return favorites.value.includes(props.poster.id);
});

const toggleFavorite = () => {
  if (isInFavorites.value) {
    remove(props.poster.id);
  } else {
    add(props.poster.id);
  }
};
</script>

<template>
  <app-button
    :is-primary="false"
    :active="isInFavorites"
    @click="toggleFavorite"
  >
    <app-icon
      class="icon"
      :icon="isInFavorites ? 'heart' : 'heart-o'"
      :width="20"
      :height="20"
    />
    <template v-if="isInFavorites">
      {{ $t("removeFromFavorites") }}
    </template>
    <template v-else>
      {{ $t("addToFavorites") }}
    </template>
    <span class="sr-only">: {{ poster.title }}</span>
  </app-button>
</template>

<style lang="postcss" scoped>
.icon {
  margin-right: 0.25em;
  height: 1em;
  width: auto;
  color: currentcolor;
}
</style>
