<template>
  <app-content :title="title" :content="error.message" />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.title,
    }
  },

  computed: {
    title() {
      if (this.error.statusCode === 404) {
        return this.$t('title404')
      }
      return this.$t('title500')
    },
  },
})
</script>

<i18n>
{
  "nl": {
    "title404": "Pagina niet gevonden",
    "title500": "Er is een fout opgetreden"
  },
  "de": {
    "title404": "Seite nicht gefunden",
    "title500": "Ein Fehler ist aufgetreten"
  },
  "en": {
    "title404": "Page not found",
    "title500": "An error occured"
  }
}
</i18n>
