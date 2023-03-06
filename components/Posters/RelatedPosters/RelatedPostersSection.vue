<script lang="ts" setup>
import { IRelatedPostersBase } from '~/interfaces/IPoster'

const localePath = useLocalePath()

defineProps<{
  posters: IRelatedPostersBase
}>()
</script>

<template>
  <section
    v-if="posters.edges.length"
    :class="$style['related-posters']"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" :class="$style.title">
        {{ $t('posters') }}
      </h1>
    </center-wrapper>

    <center-wrapper size="full">
      <related-posters-list :posters="posters.edges" />
    </center-wrapper>
    <center-wrapper :class="$style['btn-wrapper']">
      <app-button :to="localePath({ name: 'posters' })">
        {{ $t('viewAllPosters') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" module>
.related-posters {
  padding: 3em 0;
  background: url('/images/wall.png');
}

.title {
  text-align: center;
}

.btn-wrapper {
  text-align: right;
}
</style>
