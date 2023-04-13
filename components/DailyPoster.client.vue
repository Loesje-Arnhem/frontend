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
const date = new Date()

const { data, error } = await useAsyncGql('GetDailyPoster', {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const image = computed(() => {
  if (!data.value?.dailyPosters?.edges.length) {
    return null
  }
  return data.value?.dailyPosters?.edges[0].node.featuredImage
  
})
</script>

<template>
  <featured-image
    v-if="image"
    :image="image"
    :sizes="sizes"
  />
</template>
