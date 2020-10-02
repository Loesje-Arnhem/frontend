<template>
  <auto-complete
    v-model="search"
    :results="posters"
    :title="$t('title')"
    :placeholder="$t('placeholder')"
    @input="searchPosters"
    @close="close"
  />
</template>

<script>
import AutoComplete from '@/components/Forms/AutoComplete.vue'
import { useSearchPosters } from '~/compositions/posters'

export default {
  components: {
    AutoComplete,
  },
  setup() {
    const { posters, search, searchPosters } = useSearchPosters()

    return {
      searchPosters,
      posters,
      search,
    }
  },

  methods: {
    close() {
      this.results = {}
    },
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Zoeken naar posters",
    "placeholder": "Zoeken naar posters op tekst"
  }
}
</i18n>
