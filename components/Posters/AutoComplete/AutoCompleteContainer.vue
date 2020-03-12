<template>
  <auto-complete />
</template>

<script>
import AutoComplete from '@/components/Posters/AutoComplete/AutoComplete.vue'

export default {
  components: {
    AutoComplete,
  },
  data() {
    return {
      search: '',
    }
  },

  methods: {
    searchForPosters(search) {
      window.console.log(search)
    },
  },
}
</script>
