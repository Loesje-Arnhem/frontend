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
    <span class="sr-only">{{ $t("viewAll") }}</span>
    <span class="title"><slot /></span>
    <app-icon
      icon="chevron-down"
      class="icon"
      :width="12"
      :height="12"
    />
  </button>
</template>

<style lang="css" scoped>
.title {
  flex: 1 0 auto;
  text-align: start;
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
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding-block: 0.5em;

  &:hover,
  &[aria-expanded="true"] {
    color: var(--color-white);
    background-color: var(--color-black);
  }

  &[aria-expanded="true"] {
    & .icon {
      rotate: -180deg;
    }
  }
}
</style>
