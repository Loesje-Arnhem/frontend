<template>
  <div>
    <Navigation />
    <Posters :posters="list" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Posters from '@/components/Shared/Posters.vue'
import Navigation from '@/components/Shared/Navigation.vue'

export default {
  components: {
    Posters,
    Navigation
  },
  computed: {
    ...mapState('favorites', ['list'])
  }
}
</script>
