<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string
    width?: number
    height?: number
    title?: string | null
  }>(),
  {
    width: 24,
    height: 24,
    title: null,
  },
)

</script>

<template>
  <component
    :is="`svgo-${icon}`"
    class="icon"
    :width="width"
    :height="height"
    v-bind="$attrs"
  />
</template>

<style lang="postcss" scoped>
.icon {
  width: auto;
  height: auto;
}
</style>
