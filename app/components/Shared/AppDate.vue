<script lang="ts" setup>
const props = defineProps<{
  date: string
}>()

const formattedDate = computed(() => {
  if (!props.date) {
    return null
  }
  return new Date(props.date)
})

const dateTime = computed(() => {
  if (!formattedDate.value) {
    return ''
  }
  return `${formattedDate.value.getFullYear()}-${
    formattedDate.value.getMonth() + 1
  }-${formattedDate.value.getDate()}`
})
</script>

<template>
  <time
    v-if="formattedDate"
    :datetime="dateTime"
  >
    {{ $d(new Date(formattedDate), "short") }}
  </time>
</template>
