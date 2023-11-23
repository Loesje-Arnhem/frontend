<script lang="ts" setup>
import { type RelatedPostersFragment } from '#gql'

const localePath = useLocalePath()
const { t } = useI18n()

const props = defineProps<{
  posters?: RelatedPostersFragment | null
  title?: string | null
}>()

const title = props.title || t('posters')
</script>

<template>
  <section
    v-if="posters?.edges.length"
    class="related-posters"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" class="title">
        {{ title }}
      </h1>
    </center-wrapper>

    <center-wrapper size="full">
      <related-posters-list :posters="posters.edges" />
    </center-wrapper>
    <center-wrapper class="btn-wrapper">
      <app-button :to="localePath({ name: 'posters' })">
        {{ $t('viewAllPosters') }}
      </app-button>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" scoped>
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
