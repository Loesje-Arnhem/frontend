<template>
  <div>
    <h1>Favorieten</h1>
    <poster-navigation />
    <poster-list :posters="list" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import PosterNavigation from '~/components/Posters/Shared/PosterNavigation.vue'

export default {
  components: {
    PosterList,
    PosterNavigation,
  },
  computed: {
    ...mapState('favorites', ['list']),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters/favorieten',
    },
  },
}
</script>
