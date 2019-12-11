<template>
  <section :class="$style.posters" aria-labelledby="posters-title">
    <!-- eslint-disable -->
    <center-wrapper :class="$style.wrapper" size="full">
      <h1 id="posters-title" :class="$style.title">Posters</h1>
      <apollo-query :query="require('~/graphql/Posters.gql')" :variables="{ first: 5 }">
        <template slot-scope="{ result: { data, loading }, query }">
          <app-loader v-if="loading" />
          <template v-else>
            <ul :class="$style.list">
              <li
                v-for="poster in data.posters.edges"
                :key="poster.node.id"
                :class="$style['list-item']"
              >
                <poster-tile :poster="poster.node" :class="$style.link" />
              </li>
            </ul>
          </template>
        </template>
      </apollo-query>
      <div :class="$style['btn-wrapper']">
        <app-button to="/posters">Bekijk alle posters</app-button>
      </div>
    </center-wrapper>
  </section>
</template>

<script>
import PosterTile from '@/components/Poster/PosterTile.vue'
import AppButton from '@/components/Shared/AppButton.vue'
import CenterWrapper from '@/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PosterTile,
    AppButton,
    CenterWrapper
  }
}
</script>

<style lang="postcss" module>
.posters {
  padding: 3em 0;
  background: url('/images/backgrounds/wall.jpg');
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
