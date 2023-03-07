<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/posters/favorieten',
  },
})

const favorites = useFavoriteIds()
</script>

<template>
  <posters-overview-section
    v-if="favorites.length"
    :poster-ids="favorites"
    :title="$t('favorites')"
  />
  <center-wrapper v-else>
    <p>Geen favorieten</p>
  </center-wrapper>
</template>
