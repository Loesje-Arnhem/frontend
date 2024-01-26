<script lang="ts" setup>
const localePath = useLocalePath()
const { t } = useI18n()

const props = defineProps<{
  title: string | null
  search: string | null
  subjects: number[]
  posterIds: number[]
}>()

const { data } = useFetch('/api/posters/posters', {
  query: {
    include: props.posterIds.join(','),
    search: props.search,
    subjects: props.subjects,
    pageSize: 7,
  },
})

const title = props.title || t('posters')
</script>

<template>
  <section
    v-if="data?.length"
    class="related-posters"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" class="title">
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
