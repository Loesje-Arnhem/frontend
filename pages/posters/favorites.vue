<template>
  <div>
    <center-wrapper>
      <h1>Favorieten</h1>
      <poster-navigation />
    </center-wrapper>
    <poster-list :posters="list" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import PosterNavigation from '~/components/Posters/Shared/PosterNavigation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PosterList,
    PosterNavigation,
    CenterWrapper,
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
