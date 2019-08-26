<template>
  <div>
    <Navigation />
    <poster-list :posters="list" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PosterList from '@/components/Poster/PosterList.vue'
import Navigation from '@/components/Shared/Navigation.vue'

export default {
  components: {
    PosterList,
    Navigation
  },
  computed: {
    ...mapState('favorites', ['list'])
  }
}
</script>
