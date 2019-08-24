<template>
  <section class="posters" aria-labelledby="posters-title">
    <div class="wrapper">
      <h1 id="posters-title" class="title">Posters</h1>
      <ul class="list">
        <li v-for="poster in posters" :key="poster.id" class="list-item">
          <Poster :poster="poster" class="link" />
        </li>
      </ul>

      <div class="btn-wrapper">
        <app-button to="/posters" title="Bekijk alle posters" />
      </div>
    </div>
  </section>
</template>

<script>
import Poster from '@/components/Shared/Poster.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    Poster,
    AppButton
  },
  props: {
    posters: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
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
  max-width: 10em;
}
</style>
