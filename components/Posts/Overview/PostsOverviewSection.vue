<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    exclude?: number
  }>(),
  {
    exclude: 0,
  },
)

const { data, pending } = await useFetch('/api/posts', {
  key: `posts`,
  params: {
    exclude: props.exclude,
  },
})
</script>

<template>
  <section
    :class="$style['posts-overview']"
    aria-labelledby="posts-overview-title"
  >
    <center-wrapper size="md">
      <h1 id="posts-overview-title">
        <template v-if="exclude">
          {{ $t('otherNews') }}
        </template>
        <template v-else>
          {{ $t('posts') }}
        </template>
      </h1>
      <app-loader v-if="pending" />
      <template v-else-if="data?.items.length">
        <posts-overview-list :posts="data.items" />
      </template>
    </center-wrapper>
  </section>
</template>

<style lang="postcss" module>
.posts-overview {
  @mixin block;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
