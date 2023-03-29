<script lang="ts" setup>
import { Endpoints } from '~~/enums/endpoints';
import { IRelatedPosters } from '~~/interfaces/IContent'

const localePath = useLocalePath()
const { t } = useI18n()

const props = defineProps<{
  posters: IRelatedPosters
}>()

let key = 'related-posters'
if (props.posters.search) {
  key = `${key}-${props.posters.search}`
}
if (props.posters.subjects.length) {
  key = `${key}-${props.posters.subjects.join(',')}`
}
if (props.posters.posterIds.length) {
  key = `${key}-${props.posters.posterIds.join(',')}`
}

const { data, pending } = await useFetch(Endpoints.RelatedPosters, {
  key,
  params: {
    search: props.posters.search,
    subjects: props.posters.subjects,
    posterId: props.posters.posterIds,
  },
})

const title = props.posters.title || t('posters')
</script>

<template>
  <section
    class="related-posters"
    aria-labelledby="related-posters-title"
  >
    <app-loader v-if="pending" />
    <div v-else-if="data">
      <center-wrapper>
        <h1
          id="related-posters-title"
          class="title"
        >
          {{ title }}
        </h1>
      </center-wrapper>

      <center-wrapper size="full">
        <related-posters-list :posters="data" />
      </center-wrapper>
      <center-wrapper class="btn-wrapper">
        <app-button :to="localePath({ name: 'posters' })">
          {{ $t('viewAllPosters') }}
        </app-button>
      </center-wrapper>
    </div>
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
