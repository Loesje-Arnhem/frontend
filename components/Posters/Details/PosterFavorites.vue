<script lang="ts" setup>
import { IPoster } from '~/interfaces/IPoster'

const props = defineProps<{
  poster: IPoster
}>()
const favorites = useState<number[]>('favorites')

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
  <div>
    <app-button
      :is-primary="false"
      :class="{ 'is-active': isInFavorites }"
      @click="toggleFavorite"
    >
      <app-icon
        :class="$style.icon"
        :icon="isInFavorites ? 'heart' : 'heart-o'"
        :width="20"
        :height="20"
      />
      <template v-if="isInFavorites">
        {{ $t('remove') }}
      </template>
      <template v-else>
        {{ $t('add') }}
      </template>
      <span class="sr-only">: {{ poster.title }}</span>
    </app-button>
  </div>
</template>

<style lang="postcss" module>
.icon {
  margin-right: 0.25em;
  height: 1em;
  width: auto;
  transform: translateY(0.1em);
  color: currentcolor;
}
</style>

<!-- <i18n>
{
  "nl": {
    "add": "Voeg toe aan je favorieten",
    "remove": "Verwijder uit je favorieten"
  }
}
<i18n> -->
