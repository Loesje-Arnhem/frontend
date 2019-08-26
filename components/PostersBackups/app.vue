<template>
  <div id="app">
    <div class="wrapper">
      <Transition :name="transitionName">
        <RouterView :key="$route.fullPath" />
      </Transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  watch: {
    $route(to) {
      if (to.name === 'Poster') {
        this.transitionName = 'slide-top';
      } else if (to.name === 'Favorites') {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    },
  },
  created() {
    this.populateTags();
  },

  methods: {
    ...mapActions({
      populateTags: 'tags/populateTags',
    }),
  },
};
</script>

<style scoped>
#app {
  background: '@/assets/images/wall.jpg';
  padding-bottom: 2em;
  min-height: 100vh;
}

.wrapper {
  @mixin center;
}
</style>
