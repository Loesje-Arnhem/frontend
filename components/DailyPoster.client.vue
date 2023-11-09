<script lang="ts" setup>
import type { MediaItemFragment } from '#gql'

type DailyPoster = MediaItemFragment & {
  date: string
}

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
  if (value < 10) {
    return `0${value}`
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

const poster = ref<DailyPoster | null>(null)

const fetchDailyPoster = async () => {
  const data = await $fetch<DailyPoster>(
    `${config.public.apiUrl}wp-content/uploads/daily-posters/${getDate()}.json`,
  )
  poster.value = data
  await localStorage.setItem(
    'daily-poster',
    JSON.stringify({
      ...data,
      date: getDate(),
    }),
  )
}

const posterFromStorage = await localStorage.getItem('daily-poster')
if (posterFromStorage) {
  const parsedData = JSON.parse(posterFromStorage)
  if (parsedData.date === getDate()) {
    poster.value = parsedData
  } else {
    fetchDailyPoster()
  }
} else {
  fetchDailyPoster()
}
</script>

<template>
  <featured-image
    v-if="poster"
    :image="poster"
    :sizes="sizes"
  />
</template>
