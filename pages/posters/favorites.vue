<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/posters/favorieten',
  },
})

const favorites = useState<number[]>('favorites')
</script>

<template>
  <posters-overview-section
    v-if="favorites.length"
    :poster-ids="favorites"
    :title="$t('title')"
  />
  <center-wrapper v-else>
    <p>Geen favorieten</p>
  </center-wrapper>
</template>

<i18n>
{
  "nl": {
    "title": "Favorieten"
  }
}
</i18n>
