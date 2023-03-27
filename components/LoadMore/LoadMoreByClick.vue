<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)
defineEmits(['load-more'])
</script>

<template>
  <app-loader v-if="loading" />
  <div
    v-else
    :class="$style.wrapper"
  >
    <app-button @click="$emit('load-more')">
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        {{ $t('showMore') }}
      </template>
    </app-button>
  </div>
</template>

<style lang="postcss" module>
.wrapper {
  text-align: center;
}
</style>
