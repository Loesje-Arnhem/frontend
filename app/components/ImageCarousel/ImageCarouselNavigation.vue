<script lang="ts" setup>
defineProps<{
  previousSlideEnabled: boolean
  nextSlideEnabled: boolean
}>()

defineEmits(['next', 'previous'])
</script>

<template>
  <div class="buttons">
    <button
      class="btn-previous"
      :disabled="!previousSlideEnabled"
      @click="$emit('previous')"
    >
      <app-icon
        icon="chevron-left"
        title="Vorige slide"
      />
    </button>
    <button
      class="btn-next"
      :disabled="!nextSlideEnabled"
      @click="$emit('next')"
    >
      <app-icon
        icon="chevron-right"
        title="Volgende slide"
      />
    </button>
  </div>
</template>

<style lang="css" scoped>
.btn-next,
.btn-previous {
  position: absolute;
  inset-block-start: 50%;
  z-index: 9;
  margin-block-start: -0.75em;
  touch-action: manipulation;

  &[disabled] {
    opacity: 0.5;
  }
}

.btn-next {
  inset-inline-end: 0;
}

.btn-previous {
  inset-inline-start: 0;
}

.icon {
  inline-size: 1.5em;
  block-size: 1.5em;
}
</style>
