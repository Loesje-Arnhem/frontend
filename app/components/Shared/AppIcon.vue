<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string
    width?: number
    height?: number
  }>(),
  {
    width: 24,
    height: 24,

  },
)
</script>

<template>
  <nuxt-icon
    class="icon"
    :name="`loesje:${icon}`"
    :width
    :height
  />
</template>
