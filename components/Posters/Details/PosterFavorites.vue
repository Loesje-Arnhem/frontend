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
      {{ title }}
      <span class="sr-only">: {{ poster.title }}</span>
    </app-button>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  props: {
    poster: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { favorites } = useFavorites()

    const isInFavorites = computed(() => {
      return favorites.value.includes(props.poster.node.databaseId)
    })

    const toggleFavorite = () => {
      if (isInFavorites.value) {
        favorites.value.filter(
          (databaseId) => databaseId !== props.poster.node.databaseId,
        )
      } else {
        favorites.value.push(props.poster.node.databaseId)
      }
    }

    const title = computed(() => {
      return 'add'
    })

    return {
      toggleFavorite,
      isInFavorites,
      favorites,
      title,
    }
  },
  // computed: {
  //   title() {
  //     if (this.isInFavorites) {
  //       return this.$t('remove')
  //     }
  //     return this.$t('add')
  //   },
  // },
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
