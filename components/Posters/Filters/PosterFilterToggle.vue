<script lang="ts" setup>
withDefaults(
  defineProps<{
    isActive: boolean
  }>(),
  {
    isActive: false,
  },
)
defineEmits(['toggle'])
</script>

<template>
  <button
    class="btn"
    type="button"
    :aria-expanded="isActive ? 'true' : 'false'"
    @click="$emit('toggle')"
  >
    <span class="sr-only">{{ $t('viewAll') }}</span>
    <span class="title"><slot /></span>
    <app-icon icon="chevron-down" class="icon" :width="12" :height="12" />
  </button>
</template>

<style lang="postcss" scoped>
.title {
  flex: 1 0 auto;
  text-align: left;
}

.sr-only {
  @mixin sr-only;
}

.icon {
  @mixin icon 1em;

  flex: 0 0 auto;
  transition: rotate 0.2s ease-out;
}

.btn {
  gap: 0.5em;
  display: flex;
  align-items: center;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  &:hover,
  &[aria-expanded='true'] {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  &[aria-expanded='true'] {
    & .icon {
      rotate: -180deg;
    }
  }
}
</style>
