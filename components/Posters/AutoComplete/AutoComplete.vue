<template>
  <div>
    <auto-complete-form v-model="search" :results2="results" @input="testa" />
  </div>
</template>

<script>
import AutoCompleteForm from '@/components/Posters/AutoComplete/AutoCompleteForm.vue'

export default {
  components: {
    AutoCompleteForm
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    results() {
      if (this.data && this.data.posters.edges.length) {
        return this.data.posters.edges
      }
      return []
    }
  },
  methods: {
    testa(test) {
      this.$emit('searchForPosters')
    }
  }
}
</script>
