<script lang="ts" setup>
const localePath = useLocalePath()

const { getPosters } = useServer()

const { data, pending } = await useLazyAsyncData(
  `related-posters`,
  async () => {
    return await getPosters()
  },
)
</script>

<template>
  <section class="related-posters" aria-labelledby="related-posters-title">
    <app-loader v-if="pending" />
    <div v-else-if="data">
      <center-wrapper>
        <h1 id="related-posters-title" class="title">
          {{ $t('posters') }}
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
