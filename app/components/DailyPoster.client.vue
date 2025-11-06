<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

withDefaults(
  defineProps<{
    sizes?: string
  }>(),
  {
    sizes: '100vw sm:270px',
  },
)

const addTrailingZeroToValue = (value: number) => {
  if (value < 10) {
    return `0${value}`
  }
  else {
    return value.toString()
  }
}

const getDate = () => {
  const date = new Date()
  const month = addTrailingZeroToValue(date.getMonth() + 1)
  const day = addTrailingZeroToValue(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}

const poster = ref<FeaturedImage | undefined>(undefined)

const { execute } = useFetch('/api/posters/daily-poster', {
  params: {
    date: getDate(),
  },
  onResponse({ response }) {
    localStorage.setItem(
      'daily-poster',
      JSON.stringify({
        ...response._data,
        date: getDate(),
      }),
    )
    poster.value = response._data
  },
  immediate: false,
})

onMounted(async () => {
  const posterFromStorage = await localStorage.getItem('daily-poster')
  if (posterFromStorage) {
    const parsedData = JSON.parse(posterFromStorage)
    if (parsedData.date === getDate()) {
      poster.value = parsedData
    }
    else {
      await execute()
    }
  }
  else {
    await execute()
  }
})
</script>

<template>
  <app-image
    v-if="poster"
    v-bind="poster"
    :sizes="sizes"
    :lazy="false"
  />
</template>
