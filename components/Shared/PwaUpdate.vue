<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import AppAlert from '@/components/Shared/AppAlert.vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()
</script>

<template>
  <app-alert :show="needRefresh" text="Er is een nieuwe versie beschikbaar.">
    <button class="btn-link" @click="() => updateServiceWorker()">
      Verversen
    </button>
  </app-alert>
</template>
