<script lang="ts" setup>
withDefaults(
  defineProps<{
    sizes?: string
  }>(),
  {
    sizes: '(max-width: 375px) 100vw, 270px',
  },
)
const date = new Date()

const { data } = await useAsyncGql('GetDailyPoster', {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const poster = computed(() => {
  if (!data.value?.dailyPosters?.edges.length) {
    return null
  }
  return data.value?.dailyPosters?.edges[0].node
})
</script>

<template>
  <featured-image
    v-if="poster?.featuredImage"
    :image="poster.featuredImage.node"
    :alt="poster.title"
    :sizes="sizes"
  />
</template>
