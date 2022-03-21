<template>
  <div>
    <center-wrapper>
      <h1>Favorieten</h1>
    </center-wrapper>
    <poster-list :posters="favorites" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useFavorites from '~/composables/useFavorites'

export default defineComponent({
  setup() {
    const { favorites } = useFavorites()
    return {
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
