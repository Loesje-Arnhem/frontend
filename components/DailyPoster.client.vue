<script lang="ts" setup>
import { Endpoints } from '~/enums/endpoints';

withDefaults(
  defineProps<{
    sizes?: string
  }>(),
  {
    sizes: '(max-width: 375px) 100vw, 270px',
  },
)

const { data } = await useFetch(Endpoints.DailyPoster, {
  key: `daily-poster`,
})
</script>

<template>
  <featured-image
    v-if="data?.featuredImage"
    :image="data.featuredImage"
    :sizes="sizes"
  />
</template>
