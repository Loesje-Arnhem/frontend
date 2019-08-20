<template>
  <div>
    <Navigation />
    <Posters :posters="list" />
  </div>
</template>

<script>
import Posters from '@/components/Shared/Posters.vue';
import Navigation from '@/components/Shared/Navigation.vue';

import { mapState } from 'vuex';

export default {
  components: {
    Posters,
    Navigation,
  },
  computed: {
    ...mapState('favorites', ['list']),
  },
};
</script>
