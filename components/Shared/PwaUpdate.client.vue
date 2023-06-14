<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <app-alert
    :show="$pwa.needRefresh"
    :text="t('newContentAvailable')"
  >
    <button
      class="btn-link"
      @click="$pwa.updateServiceWorker()"
    >
      {{ t('newContentAvailable') }}
    </button>
  </app-alert>
</template>

<i18n lang="json">
{
  "en": {
    "refresh": "Refresh",
    "newContentAvailable": "New content is available."
  },
  "nl": {
    "refresh": "Verversen",
    "newContentAvailable": "Er is een nieuwe versie beschikbaar."
  }
}
</i18n>
