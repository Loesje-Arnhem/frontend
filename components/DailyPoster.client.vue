<script lang="ts" setup>
import type { MediaItemFragment } from '#gql';

withDefaults(
  defineProps<{
    sizes?: string
  }>(),
  {
    sizes: '(max-width: 375px) 100vw, 270px',
  },
)
const config = useRuntimeConfig()

const addTrailingZeroToValue = (value: number) => {
  if (value < 9) {
    return  `0${value}`
  } else {
    return value.toString()
  }  
}

const getDate = () => {
  const date = new Date()
  const month = addTrailingZeroToValue(date.getMonth() + 1)
  const day = addTrailingZeroToValue(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}

const { data } = useFetch<{
  title: string,
  image: MediaItemFragment
}>(`${config.public.apiUrl}wp-content/uploads/daily-posters/${getDate()}.json`)
</script>

<template>
  <featured-image
    v-if="data"
    :image="data.image"
    :alt="data.title"
    :sizes="sizes"
  />
</template>
