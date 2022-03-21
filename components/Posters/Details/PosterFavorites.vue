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
        width="20"
        height="20"
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

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'
import { IPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IPoster>,
      required: true,
    },
  },
  setup(props) {
    const { favorites, add, remove } = useFavorites()

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

    return {
      toggleFavorite,
      isInFavorites,
      favorites,
    }
  },
})
</script>

<style lang="postcss" module>
.icon {
  margin-right: 0.25em;
  height: 1em;
  width: auto;
  transform: translateY(0.1em);
  color: currentColor;
}
</style>

<i18n>
{
  "nl": {
    "add": "Voeg toe aan je favorieten",
    "remove": "Verwijder uit je favorieten"
  }
}
</i18n>
