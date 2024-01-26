<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/posters/favorieten',
  },
})

const favorites = useFavoriteIds()
</script>

<template>
  <client-only>
    <posters-overview-section
      v-if="favorites.length"
      :include="favorites"
      :title="$t('favorites')"
    />
    <center-wrapper v-else>
      <p>Geen favorieten</p>
    </center-wrapper>
  </client-only>
</template>
