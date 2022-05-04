<template>
  <posters-overview-section
    v-if="favorites.length"
    :posters="posters"
    :poster-ids="favorites"
    :title="$t('title')"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  setup() {
    const { favorites } = useFavorites()
    const posters = {
      pageInfo: {
        endCursor: '',
        hasNextPage: true,
      },
      edges: [],
    }
    return {
      posters,
      favorites,
    }
  },
  head: {
    title: 'Favorieten',
  },

  nuxtI18n: {
    paths: {
      nl: '/posters/favorieten',
    },
  },
})
</script>

<i18n>
{
  "nl": {
    "title": "Favorieten"
  }
}
</i18n>
