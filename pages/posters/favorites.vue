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

export default {
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
