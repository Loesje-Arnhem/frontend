<script lang="ts" setup>
import { PosterDetailsFragment } from '#gql'

const props = defineProps<{
  poster: PosterDetailsFragment
}>()
const favorites = useFavoriteIds()

const { add, remove } = useFavorites()

const isInFavorites = computed(() => {
  return favorites.value.includes(props.poster.databaseId)
})

const toggleFavorite = () => {
  if (isInFavorites.value) {
    remove(props.poster.databaseId)
  } else {
    add(props.poster.databaseId)
  }
}
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
      {{ $t('removeFromFavorites') }}
    </template>
    <template v-else>
      {{ $t('addToFavorites') }}
    </template>
    <span class="sr-only">: {{ poster.title }}</span>
  </app-button>
</template>

<style lang="postcss" scoped>
.icon {
  margin-right: 0.25em;
  height: 1em;
  width: auto;
  transform: translateY(0.1em);
  color: currentcolor;
}
</style>
