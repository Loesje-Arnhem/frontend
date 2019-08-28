<template>
  <section
    v-if="posters.edges.length"
    class="posters"
    aria-labelledby="posters-title"
  >
    <div class="wrapper">
      <h1 id="posters-title" class="title">Posters</h1>
      <ul class="list">
        <li
          v-for="poster in posters.edges"
          :key="poster.node.id"
          class="list-item"
        >
          <poster-tile :poster="poster.node" class="link" />
        </li>
      </ul>

      <div class="btn-wrapper">
        <app-button to="/posters" title="Bekijk alle posters" />
      </div>
    </div>
  </section>
</template>

<script>
import PosterTile from '@/components/Poster/PosterTile.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    PosterTile,
    AppButton
  },
  props: {
    posters: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="postcss">
.posters {
  padding: 3em 0;
  background: url('/images/backgrounds/wall.jpg');
}

.wrapper {
  @mixin gutter;
}

.title {
  text-align: center;
}

.btn-wrapper {
  @mixin center;
  text-align: right;
}

.list {
  @mixin list-reset;
  margin-bottom: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list-item {
  padding: 0.5em;
  flex: 0 0 10em;
}
</style>
