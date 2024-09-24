<script lang="ts" setup>
defineProps<{
  previousSlideEnabled: boolean;
  nextSlideEnabled: boolean;
}>();

defineEmits(["next", "previous"]);
</script>

<template>
  <div class="buttons">
    <button
      class="btn-previous"
      :disabled="!previousSlideEnabled"
      @click="$emit('previous')"
    >
      <app-icon icon="chevron-left" title="Vorige slide" />
    </button>
    <button
      class="btn-next"
      :disabled="!nextSlideEnabled"
      @click="$emit('next')"
    >
      <app-icon icon="chevron-right" title="Volgende slide" />
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.btn-next,
.btn-previous {
  position: absolute;
  top: 50%;
  margin-top: -0.75em;
  touch-action: manipulation;
  z-index: 9;

  &[disabled] {
    opacity: 0.5;
  }
}

.btn-next {
  right: 0;
}

.btn-previous {
  left: 0;
}

.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
